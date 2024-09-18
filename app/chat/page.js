"use client"
import { Box, Grid2, CardActionArea, CardContent, Typography} from '@mui/material'
import { useEffect, useState } from 'react'
import ChatNavBar from '../_navbar/ChatNavBar';
import MyModal from './_component/MyModal';
import ChatBotDisplay from './_component/ChatBotDisplay';
import ChatBotIcon from './_component/ChatBotIcon';
import UrlBar from './_component/UrlBar';
import LoadingSpinner from './_component/LoadingSpinner';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/firebase';


const dummy = [
  {
    'id': 'Dr. Alice Smith',
    'metadata': {
      'subject': 'Computer Science',
      'rating': 4,
      'levelOfDifficulty': 3
    }
  },
  {
    'id': 'Prof. John Doe',
    'metadata': {
      'subject': 'Mathematics',
      'rating': 5,
      'levelOfDifficulty': 4
    }
  },
  {
    'id': 'Dr. Emily Johnson',
    'metadata': {
      'subject': 'Physics',
      'rating': 3,
      'levelOfDifficulty': 2
    }
  },
  {
    'id': 'Prof. Michael Brown',
    'metadata': {
      'subject': 'Chemistry',
      'rating': 4,
      'levelOfDifficulty': 5
    }
  },
  {
    'id': 'Dr. Sarah Wilson',
    'metadata': {
      'subject': 'Biology',
      'rating': 2,
      'levelOfDifficulty': 1
    }
  }
];
const StyledSpinner = {
  display: 'flex', 
  width: '100%',
  mt: '250px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
export default function Page() {
    const [openChat, setOpenChat] = useState(false);
    const [search, setSearch] = useState('');
    const [openAddProfessor, setAddProfessor] = useState(false);
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleCloseAddProfessor(){
        setAddProfessor(open => !open);
    }
    async function getProfessor(url) {
      try {
        setIsLoading(true);
        const response = await fetch('/api/professor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url
          }),
        });
    
        const data = await response.json();
        const {professor, rating, difficulty, subject} = data.data;
        const newData = {
          id: professor,
          metadata: {
            subject,
            rating,
            difficulty,
          },
        }
        setCollections(collections.concat(newData));
        console.log(newData);

      } catch (error) {
        console.error('Error in getProfessor:', error);
      } finally{
        setIsLoading(false);
      }
    }
    useEffect(() => {
      async function getData(){
        try {
          setIsLoading(true);
          const userInventoryRef = collection(db, 'professors');
          const snapshot = await getDocs(userInventoryRef);
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCollections(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false)
        }
      }
      getData();
    },[setIsLoading, setCollections]);
  return (
    <Box sx={{
        height: '100vh', 
        width: '100vw',
        backgroundColor: '#111214',
        position: 'relative'
    }}>
        {openAddProfessor && <MyModal handleCloseAddProfessor={handleCloseAddProfessor} openAddProfessor={openAddProfessor}/>}
        <ChatNavBar search={search} setSearch={setSearch}/>
        <UrlBar getProfessor={getProfessor}/>
        {isLoading ? <Box sx={StyledSpinner}><LoadingSpinner isLoading={isLoading}/></Box> : (
          <Grid2 container spacing={3} sx={{width: '100vw', height: '90vh', overflowY: 'auto', p: 1, mt: 2, bgcolor: 'inherit', pl: 2}}>
          {collections.filter((card) => {
            return card?.id?.toLowerCase() === '' ? card : card?.id?.toLowerCase()?.includes(search?.toLowerCase());
          }).map(collection => (
            <Grid2 xs={8} md={3} key={collection.id} sx={{display: 'flex', justifyContent: 'center'}}>
              <CardActionArea sx={{bgcolor: '#1e1f21', color: '#fff', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
              transition: 'transform 0.2s', // Smooth hover effect
              '&:hover': {
                transform: 'scale(1.05)', // Slight scale on hover
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
              },
              width: '100%', // Ensure cards fit within grid columns
              height: '150px', // Smaller card height
              maxWidth: '180px', // Constrain the width to keep it compact
            }}>
              <CardContent sx={{p: 2}}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="div" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {collection.id}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', marginTop: 1 }}>Subject: {collection.metadata.subject.substr(0, collection.metadata.subject.indexOf('department'))}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', marginTop: 0.5 }}>Rating: {collection.metadata.rating} / 5</Typography>
                  <Typography sx={{ fontSize: '0.8rem', marginTop: 0.5 }}>Difficulty: {collection.metadata.difficulty}</Typography>
                </Box>
              </CardContent>
              </CardActionArea>
            </Grid2>
          ))}
          </Grid2>
        )}


        {openChat && <ChatBotDisplay setOpenChat={setOpenChat}/>}
        <ChatBotIcon setOpenChat={setOpenChat} openChat={openChat}/>
    </Box>
  )
}
