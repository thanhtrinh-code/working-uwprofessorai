import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";


export default function HomeNavBar() {
  const router = useRouter();
  return (
    <Box width='100%' height='8vh' bgcolor='inherit' display='flex' justifyContent='space-between' px={10} py={3}>
        <a href="/" style={{cursor: 'pointer', textDecoration: 'none'}}>
        <Box display='flex'>
          {/* <Image src='/logo.png' width={70} height={70} alt="Logo"/> */}
          <Typography sx={{
            fontSize: 21,
            fontWeight: 'bold', fontFamily: 'sans-serif',
            color: 'white'}}>
            UW ProfessorAi
          </Typography>
        </Box>
        </a>
        <Box>
          <Button variant="contained" onClick={() => router.push('/chat')}
          sx={{
            backgroundColor: 'inherit',
            border: '3px solid purple',
            borderRadius: 10, p: '0.5rem 1.5rem',
            '&:hover': {
                backgroundColor: 'inherit',
                color: '#c3c3c3'
            },
          }}>
            Main Display
          </Button>
        </Box>
      </Box>
  )
}
