"use client"
import { Box, Button, Typography } from "@mui/material";
import HomeNavBar from "./_navbar/HomeNavBar";
import Product from "./_sections/Product";

export default function Home() {
  
  return (
    <Box width='100vw' height='100vh' bgcolor='#111214' color='white'>
      <HomeNavBar/>
      <Product/>
    </Box>
  );
}
