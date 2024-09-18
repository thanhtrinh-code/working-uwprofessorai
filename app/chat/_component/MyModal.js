import MyForm from "./MyForm";
import { Box, Divider, Modal } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',  
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
  };
export default function MyModal({openAddProfessor, handleCloseAddProfessor}) {
  return (
    <Modal
                open={openAddProfessor}
                onClose={handleCloseAddProfessor}
              >
                <Box display='flex' sx={style}>
                  <MyForm/>
                  <Divider orientation='vertical' textAlign='center'>
                    Or
                  </Divider>
                  <Box width='50%' height='100%' bgcolor='red' display='flex' justifyContent='center'>
                    Scrape Rate My Professor Url
                  </Box>
                </Box>
              </Modal>
  )
}
