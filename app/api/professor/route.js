import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import puppeteer from "puppeteer";
import OpenAI from "openai";
import { doc, setDoc } from "firebase/firestore";
import db from "@/firebase";


export async function POST(req) {
    try {
        // Parse the request body
        const { url } = await req.json();
        const client = new OpenAI();
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });


        // Launch Puppeteer browser
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });

        // Open a new page
        const page = await browser.newPage();

        // Navigate to the provided URL
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });

        // Extract the rating using the corrected selector
        const data = await page.evaluate(() => {
            const firstname = document.querySelector('div.NameTitle__Name-dowf0z-0.cfjPUG span')?.textContent.trim();
            const lastname = document.querySelector('div.NameTitle__Name-dowf0z-0.cfjPUG span.NameTitle__LastNameWrapper-dowf0z-2.glXOHH ')?.textContent.trim();
            const professor = `${firstname} ${lastname}`;

            const rating = document.querySelector('div.RatingValue__Numerator-qw8sqy-2.liyUjw')?.textContent;

            const feedbackItems = document.querySelectorAll('div.FeedbackItem__StyledFeedbackItem-uof32n-0.dTFbKx');
            const subject = document.querySelector("a.TeacherDepartment__StyledDepartmentLink-fl79e8-0.iMmVHb")?.textContent || "No Subject";
        
            let difficulty; 
            for (const item of feedbackItems) {
                const descriptionElement = item.querySelector('div.FeedbackItem__FeedbackDescription-uof32n-2.hddnCs');
                const numberElement = item.querySelector('div.FeedbackItem__FeedbackNumber-uof32n-1.kkESWs');
                
                if (descriptionElement && numberElement) {
                    const descriptionText = descriptionElement.textContent.trim();
                    
                    // Check if description matches "Level of Difficulty"
                    if (descriptionText === 'Level of Difficulty') {
                        difficulty = numberElement.textContent.trim();
                    }
                }
            }

            const comments = [];
            const maxNumberOfComment = 10;
            const commentsList = document.querySelectorAll('ul.RatingsList__RatingsUL-hn9one-0.cbdtns');
            for (const ul of commentsList) {
                const liElements = ul.querySelectorAll('li');
                for (const li of liElements) {
                    if (comments.length >= maxNumberOfComment) break;
                    const commentText = li.querySelector('div.Comments__StyledComments-dzzyvm-0.gRjWel')?.textContent || 'No comment';
                    comments.push(commentText);
                }
                if (comments.length >= maxNumberOfComment) break;
            }
            return {professor, rating, difficulty, comments, subject};

            
        });

        // Close the browser
        await browser.close();

        const {professor, rating, difficulty, comments, subject} = data;
        const processed_data = [];
        for(const comment of comments){
            const response = await client.embeddings.create(
                {
                    model: 'text-embedding-3-small',
                    input: comment
                }
            )
            const embedding = response.data[0].embedding;
            const processed = {
                'values': embedding,
                'id': professor,
                'metadata': {
                    'rating': rating,
                    'difficulty': difficulty,
                    'subject': subject,
                }
            }
            processed_data.push(processed);
        }

        // Store the data in Pinecone
        const index = pc.index("professor-chatbot");
        await index.namespace('ns1').upsert(
            processed_data
        );

        // Store the data in Firestore
        const metadata = {
            'rating': rating,
            'difficulty': difficulty,
            'subject': subject,
        }
        const userInventoryDocRef = doc(db, 'professors', professor);
        await setDoc(userInventoryDocRef, {
            metadata: metadata,
        })


        // Return the rating in the response
        return NextResponse.json({data});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to scrape the rating.' }, { status: 500 });
    }
}