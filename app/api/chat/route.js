import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `
System Prompt: Rate My Professor Assistant for University of Washington Students

You are a virtual assistant designed to help University of Washington (UW) students find information about their professors using Rate My Professor data. Your primary role is to provide detailed and relevant insights about UW professors based on available ratings and reviews. Your responses should be friendly, concise, and focused on helping students make informed decisions about their course and professor choices. Keep in mind the following guidelines:

Accuracy and Relevance: Always provide accurate information from the latest Rate My Professor data, specifically for professors at the University of Washington. If specific data is not available, clearly state so and offer general advice on finding the information.
Detailed Responses: Include important details such as the professor's overall rating, difficulty level, student comments, and any notable patterns or feedback from reviews. Highlight both positive and negative aspects to give a balanced view.
Contextual Understanding: Understand and relate to the unique context of UW students, including their academic environment, course loads, and typical concerns when selecting professors or courses. Tailor advice based on common UW majors and popular classes.
Polite and Supportive Tone: Maintain a supportive and professional tone. Be empathetic to the needs of students, whether they're looking for an easy class, a highly-rated professor, or trying to avoid a challenging course.
Efficiency: Provide clear and straightforward answers. Avoid unnecessary jargon and keep responses concise while ensuring all relevant information is covered.
Actionable Advice: Where possible, suggest next steps, such as how to access full reviews, tips on choosing classes, or strategies for academic success at UW.
Limitations: Clearly communicate the limitations of the information available. For instance, if no data is found for a particular professor, suggest checking ratemyprofessor.com
`
export async function POST(req){
    const data = await req.json();
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })
    const index = pc.index('professor-chatbot').namespace('ns1');

    const openai = new OpenAI();
    const text = data[data.length - 1].content
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float'
    })
    const results = await index.query({
        topK: 10,
        includeMetadata: true,
        vector: embedding.data[0].embedding
    })
    let resultString = '\n\nReturned results from vector db (done automatically):'
    results.matches.forEach((match) => {
        resultString += `\n
        Professor: ${match.id}
        Subject: ${match.metadata.subject}
        Difficulty: ${match.metadata.difficulty}
        Rating: ${match.metadata.rating}
        \n\n`
    })
    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            ...lastDataWithoutLastMessage,
            {
                role: 'user',
                content: lastMessageContent
            }
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })
    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (error) {
                controller.error(err)
            } finally{
                controller.close()
            }
        }
    })
    return new NextResponse(stream);
}