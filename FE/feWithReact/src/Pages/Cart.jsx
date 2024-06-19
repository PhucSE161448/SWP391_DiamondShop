import React from 'react'
import { Grid, Container, Box, Button } from '@mui/material'

export default function Cart() {
  const border = {
    padding: '0px',
    margin: 0
  }

  return (
    <div style={{
      width: '90vw',
      margin: '0 auto',
      display: 'flex', // Added to align items to the left
      flexDirection: 'column', // Ensures the Grids are stacked vertically
      alignItems: 'center', // Aligns items to the left
    }}>
      <Container maxWidth sx={{
        padding: '24px'
      }}>
        <Box sx={{
          marginTop: '24px',
          padding: '0 0 0 24px',
        }} >
          <Grid container justifyContent="center" spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item md={8} sm={4} xs={4} sx={border}>
              <Container sx={{
                margin: '0 auto',
                display: 'flex', // Added to align items to the left
                flexDirection: 'column', // Ensures the Grids are stacked vertically
                alignItems: 'center', // Aligns items to the left
              }}>
                <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="" />
                <h1>Nothing in cart</h1>
                <h1><Button href='/' variant="contained" size="large">Click here to continue shopping</Button></h1>
              </Container>
            </Grid>
            <Grid item md={4} sm={4} xs={4} sx={border}>
              <h1>
                Orders:
              </h1>
            </Grid>
          </Grid>
        </Box>
      </Container>

    </div >
  )
}
