import { TbMessageChatbotFilled } from "react-icons/tb";
import { RxDividerHorizontal } from "react-icons/rx";
import { Box } from '@mui/material'

export default function ChatBotIcon({openChat, setOpenChat}) {
  return (
    <Box sx={{ position: 'fixed', // Position the icon absolutely
            bottom: '30px', // Adjust distance from the bottom
            right: '30px', // Adjust distance from the right 
            bgcolor: 'white',
            p: 1,
            borderRadius: 50,

            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'lightgray',
            },
          }}>
        {!openChat ? <TbMessageChatbotFilled color="black" size={50} onClick={() => setOpenChat(open => !open)}/> :
        <RxDividerHorizontal color="black" size={50} onClick={() => setOpenChat(open => !open)}/> }
        </Box>
  )
}
