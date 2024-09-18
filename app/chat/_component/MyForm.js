import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function MyForm() {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [avgRating, setAvgRating] = useState(null);
    const [reviews, setReviews] = useState('');
    const [school, setSchool] = useState('');
  return (
    <Box width='45%' pl={1} pr={1} pt={2}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom
        fontFamily='serif'
        >
            Add Teacher
        </Typography>
         <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Average Rating"
        type="number"
        value={avgRating}
        onChange={(e) => setAvgRating(e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Reviews"
        value={reviews}
        onChange={(e) => setReviews(e.target.value)}
        fullWidth
        multiline
        rows={3}
        variant="outlined"
      />

      <TextField
        label="School"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        fullWidth
        variant="outlined"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: 'black', color: 'white',
    boxShadow: '1px 1px 1px 2px #0ff' }}>
        Add Professor
      </Button>
                  </Box>
  )
}
