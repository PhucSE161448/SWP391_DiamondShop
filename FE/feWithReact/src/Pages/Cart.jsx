import React, { useEffect, useState } from 'react'
import { Grid, Container, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const [isEmpty, setIsEmpty] = useState(null)
  const [cart, setCart] = useState([])
  const border = {
    padding: '0px',
    margin: 0
  }
  const color = {
    backgroundColor: '#737373',
    '&:hover': {
      backgroundColor: '#737373',
    }
  }
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('https://localhost:7122/api/Cart/Get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          if (data.length === 0) {
            setIsEmpty(true)
          } else {
            setIsEmpty(false)
            setCart(data)
          }
        })
    }
    fetchCart()
  }, [])

  console.log(cart)

  return (
    <div style={{
      width: '90vw',
      margin: '0 auto',
      display: 'flex', // Added to align items to the left
      flexDirection: 'column', // Ensures the Grids are stacked vertically
      alignItems: 'center', // Aligns items to the left
    }}>
      {isEmpty ? (
        <Container maxWidth sx={{
          padding: '24px'
        }}>
          <Box sx={{
            marginTop: '24px',
            padding: '0 0 0 0',
          }} >
            <Grid container justifyContent="center">
              <Container sx={{
                margin: '0 auto',
                display: 'flex', // Added to align items to the left
                flexDirection: 'column', // Ensures the Grids are stacked vertically
                alignItems: 'center', // Aligns items to the left
                padding: '0 0 0 0',
              }}>
                <div style={{
                  width: '80vw',
                  height: '20vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9f9',
                  borderRadius: '50px',
                }}>
                  <h3 style={{
                    margin: '0 auto',
                    fontSize: '3em',

                  }}>Nothing in cart</h3>
                </div>
                <div style={{
                  margin: '20px auto',
                }}><Button onClick={() => navigate('/')} variant="contained" size="large" sx={color}>Click here to continue shopping</Button></div>
              </Container>
            </Grid>
          </Box>
        </Container>
      ) : (
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
                  {cart.map((item, index) => (
                    item.product ? (
                      <div key={index} style={{
                        width: '80vw',
                        height: '10vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: '#f8f9f9',
                        borderRadius: '50px',
                      }}>
                        <h3 style={{
                          margin: '0 auto',
                          fontSize: '3em',
                        }}>
                          {item.product.name}
                        </h3>
                      </div>
                    ) : null
                  ))}
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
      )
      }

    </div >
  )
}
