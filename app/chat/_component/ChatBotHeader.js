import { FaWindowClose } from "react-icons/fa";
import { Box, Typography } from '@mui/material'
import Image from 'next/image';

export default function ChatBotHeader({handleClose, isLoading}) {
  return (
    <Box sx={{
        width: '100%', bgcolor:'purple', height: '70px', position: 'sticky',
        display: 'flex', justifyContent: 'space-between', py: 0.8, mb: 1 
      }}>
        <Box display='flex' alignItems='center' ml={2}>
          <Image src='/ai.png' alt='AI' width={45} height={45} style={{
            borderRadius: '50%',
          }}/>
          <Typography sx={{
            fontSize: 18,
            fontWeight: 'bold',
            ml: 1.3,
            color: 'white'
          }}>
            AI Assistant
          </Typography>
        </Box>
        <Box mr={1} mt={1}>
          <FaWindowClose size={25} color='white' onClick={handleClose} style={{cursor: 'pointer'}}/>
        </Box>
      </Box>
  )
}
