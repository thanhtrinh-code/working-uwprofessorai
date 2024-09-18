import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react';

export default function UrlBar({getProfessor}) {
    const [url, setUrl] = useState('');
  return (
    <Box width='100%' bgcolor='inherit' display='flex' gap={2} justifyContent='center' >
          <TextField placeholder='Paste Rate My Professor url' value={url} onChange={(e) => setUrl(e.target.value)} sx={{
            bgcolor:"white", width: '430px',
            borderRadius: 3, ml: 18,
            '& .MuiOutlinedInput-root': { // Target the input root
              borderRadius: 3,
              '& .MuiInputBase-input': { // Target the input field directly
                padding: 1.2, // Remove padding
              },
              '&.Mui-focused fieldset': { // Target the fieldset when focused
                borderColor: 'inherit', // Change border color on focus
              },
            },
        
          }}/>
          <Button variant='contained' onClick={() => getProfessor(url)} sx={{
            backgroundColor: 'purple',
            color: 'white',
            borderRadius: 5,
            '&:hover': {
                backgroundColor: 'darkpurple',
            },
          }}>
            Add
          </Button>
        </Box>
  )
}
