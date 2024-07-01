import React, { useEffect, useState } from 'react'
import { Grid, Container, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const [isEmpty, setIsEmpty] = useState(null)
  const [cart, setCart] = useState([])
  const token = localStorage.getItem('token')
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
    token ? (
      <div style={{
        width: '90vw',
        margin: '0 auto',
        display: 'flex', // Added to align items to the left
        flexDirection: 'column', // Ensures the Grids are stacked vertically
        alignItems: 'center', // Aligns items to the left
      }} >
        {
          isEmpty ? (
            <Container maxWidth sx={{
              padding: '24px'
            }} >
              <Box sx={{
                marginTop: '24px',
                padding: '0 0 0 0',
              }} >
                <Grid container justifyContent="center">
                  <Container sx={{
                    margin: '0 auto',
                    display: 'flex', // Added to align items to the left
                    padding: '0 0 0 0',
                  }}>
                    <div style={{
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
            </Container >
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
                    {cart.map((item, index) => (
                      item.product ? (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          backgroundColor: '#f0f0f0',
                          borderRadius: '50px',
                          padding: 10
                        }}>
                          <div>
                            <img src={item.product.images[0].urlPath} alt="" style={{
                              width: '250px',
                              borderRadius: '50px',
                            }} />
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}>
                            <h4 style={{
                              fontSize: '3em',
                            }}>
                              {item.product.name}
                            </h4>
                          </div>
                        </div>
                      ) : null
                    ))}
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
    ) : (
      <div style={{
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '70vh',
        backgroundImage: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      }}>
        <Container sx={{
          padding: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              color: '#ad2a36'
            }}>
              <h1>
                Login to view cart
              </h1>
            </div>
            <Button onClick={() => navigate('/login')} variant="contained" size="large" sx={{
              backgroundColor: '#003468',
              width: '100%',
              borderRadius: '30px',
            }}>Login</Button>
          </div>
        </Container>
      </div>
    )
  )
}
