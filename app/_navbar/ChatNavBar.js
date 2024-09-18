
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ChatNavBar({search, setSearch}) {
  const router = useRouter();
    return (
        <Box width='100%' bgcolor='inherit' display='flex' justifyContent='space-between' px={10} py={3} alignItems='center'>
            <Box display='flex'>
              {/* <Image src='/logo.png' width={70} height={70} alt="Logo"/> */}
              <Typography sx={{
                fontSize: 21,
                fontWeight: 'bold', fontFamily: 'sans-serif',
                color: 'white'}}>
                UW ProfessorAi
              </Typography>
            </Box>
            <Box width='30vw' height={40} display='flex' alignItems='center' gap={2}>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Your Professor"
                style={{
                    width: '100%',
                    height: '100%',
                    paddingLeft: 20,
                    paddingTop: 5, paddingBottom: 5,
                    fontFamily: 'serif',
                    fontSize: '1rem',
                    borderRadius: 10,
                }}
                />
                {/* <IoIosAddCircle size={30} color="white" onClick={() => setAddProfessor(open => !open)}/> */}
            </Box>
            <Box display='flex' alignItems='center'>
            <Button variant="contained" onClick={() => router.push('/')}
          sx={{
            backgroundColor: 'inherit',
            border: '3px solid purple',
            borderRadius: 10, p: '0.5rem 1.5rem',
            '&:hover': {
                backgroundColor: 'inherit',
                color: '#c3c3c3'
            },
          }}>
            Back
          </Button>
            </Box>
          </Box>
      )
}
