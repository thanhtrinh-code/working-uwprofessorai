import { Box, Button, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
export default function Product() {
  const router = useRouter();
  return (
    <Box display='flex' width='100%' height='100%' pt={5} bgcolor='inherit'>
        <Box alignContent='center' width='50%' pl={10}>
          <Typography
        sx={{
          fontSize: '3.7rem', lineHeight: 1,
          fontWeight: 'bolder',
          background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}
      >
        Your Intelligent Rate My Professor Assistant
          </Typography>
          <Typography
        sx={{
          fontSize: '1rem',
          color: '#c3c3c3',
          marginBottom: '1.5rem',
        }}
      >
        We believe in the power of intelligence. Our AI chatbot is designed to help you 
        answer any questions you have about professors.
          </Typography>
          <Button 
        variant="contained" onClick={() => router.push('/chat')}
        sx={{
          backgroundColor: 'inherit',
          border: '3px solid purple',
          borderRadius: 10,
          '&:hover': {
            backgroundColor: 'inherit',
            color: '#c3c3c3'
          },
          padding: '0.75rem 1.5rem',
          fontSize: '1.1rem',
          textTransform: 'none',
        }}
      >
        Get Started
          </Button>
        </Box>
        <Box width='50%' height='100%' alignContent='center' justifyContent='center'>
            <Box width='100%' height='80%' position='relative'>
              <Image src='/chatbot.png' objectFit='contain' layout='fill' alt="Chatbot"/>
            </Box>
        </Box>
      </Box>
  )
}
