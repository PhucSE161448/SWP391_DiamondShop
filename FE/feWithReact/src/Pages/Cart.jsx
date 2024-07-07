import React, { useEffect, useState } from 'react'
import { Grid, Container, Box, Button, Table, TableContainer, TableHead, TableCell, TableRow, TableBody, TextField } from '@mui/material'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createApi } from '../Auth/AuthFunction'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
export default function Cart() {
  const [isEmpty, setIsEmpty] = useState(null)
  const [cart, setCart] = useState([])
  const [cartId, setCartId] = useState([])
  const [totalPriceCalculate, setTotalPriceCalculate] = useState(0)
  const [triggerRead, setTriggerRead] = useState(false)
  const token = localStorage.getItem('token')
  const dataTableHead = ['#', 'Product', 'Quantity', 'Price', 'Total amount']
  const navigate = useNavigate()
  const border = {
    padding: '0px',
    margin: 0
  }
  const colorContinueShopping = {
    backgroundColor: '#999999',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    }
  }

  const colorPayment = {
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    }

  }

  useEffect(() => {
    const url = createApi('Cart/Get')
    const fetchCart = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          const filteredData = data.filter(item => !item.isDeleted); // Filter out items where isDeleted is true
          if (filteredData.length === 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
            setCart(filteredData); // Set only the filtered data
            const allCartIds = filteredData.map(item => item.cartId);
            setCartId(allCartIds);
          }
        })
    }
    fetchCart()
  }, [triggerRead])


  const handleDecrease = async (id) => {
    const url = createApi(`Cart/Update/${id}?check=false`)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    setTriggerRead(prev => !prev)
  }

  const handleDeleteCart = async (id) => {
    const url = createApi(`Cart/Delete/${id}`)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    setTriggerRead(prev => !prev)
  }

  const handleIncrease = async (id) => {
    const url = createApi(`Cart/Update/${id}?check=true`)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    setTriggerRead(prev => !prev)
  }

  useEffect(() => {
    const calculatePrice = () => {
      let total = 0
      cart.map((item) => {
        total += item.totalPrice
      })
      setTotalPriceCalculate(total)
    }
    calculatePrice()
  }, [cart])

  const confirmOrder = () => {
    const data = {
      totalPrice: totalPriceCalculate,
      cartId: cartId
    }
    const url = createApi('Order/CreateOrder')
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
      .then(navigate('/order'))
  }

  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}>
      {
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
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',

                        padding: '0 0 0 0',
                      }}>
                        <div style={{
                          height: '20vh',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          borderRadius: '50px',
                        }}>
                          <h3 style={{
                            margin: '0 auto',
                            fontSize: '3em',

                          }}>
                            Nothing in cart
                          </h3>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          borderRadius: '50px',
                        }}>
                          <Button onClick={() => navigate('/')} variant="contained" size="large" sx={colorContinueShopping}>
                            Click here to continue shopping
                          </Button>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          borderRadius: '50px',
                        }}>
                          <Button onClick={() => navigate('/order')} variant="contained" size="large" sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#fff',
                              color: '#000',
                            }
                          }}>
                            Click here to go to your order
                          </Button>
                        </div>
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
                      <Grid item lg={6} md={8} sm={12} xs={12} sx={border}>
                        <TableContainer sx={{
                          overflow: 'auto',
                          borderRadius: '10px',
                          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(10px)',
                        }}>
                          <Table>
                            <TableHead sx={{
                              backgroundColor: '#000'
                            }}>
                              <TableRow>
                                {dataTableHead.map((head, index) => (
                                  <TableCell key={index} sx={{
                                    borderRight: '1px solid #fff',
                                  }}>
                                    <div style={{
                                      color: '#fff',
                                      fontWeight: 'bold',
                                      fontSize: '1.2em',
                                      display: 'flex',
                                      justifyContent: 'center',
                                    }}>
                                      {head}
                                    </div>
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {cart.map((item, index) => (
                                <TableRow key={index}> {/* Ensure each row has a unique key */}
                                  <TableCell>
                                    {index + 1}
                                  </TableCell>
                                  <TableCell>
                                    <Grid container spacing={2} sx={{
                                      display: 'flex',
                                      padding: '10px'
                                    }}>
                                      <Grid item xs={12} sm={12} md={3} lg={3} sx={{
                                        marginRight: '25px',
                                      }}>
                                        <img src={item.product ? item.product.images[0].urlPath : item.diamond.images[0]?.urlPath} alt="" style={{
                                          width: '125px',
                                          borderRadius: '10px',
                                          cursor: 'pointer',
                                        }}
                                          onClick={() => navigate(`/${item.product ? 'product/detail' : 'diamond/detail'}/${item.product ? item.product.id : item.diamond.id}`)}
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={6} lg={6} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                      }}>
                                        <div
                                          style={{
                                            margin: '0 auto',
                                          }}
                                          onClick={() => navigate(`/${item.product ? 'product/detail' : 'diamond/detail'}/${item.product ? item.product.id : item.diamond.id}`)}>
                                          <h4 style={{
                                            cursor: 'pointer',
                                          }}>
                                            {item.product ? item.product.name : item.diamond.name}
                                          </h4>
                                        </div>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={3} lg={2} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',

                                      }}>
                                        <div style={{
                                          display: 'flex',
                                          justifyContent: 'flex-end',
                                          alignItems: 'center',
                                        }}>
                                          <IconButton color='error' onClick={() => handleDeleteCart(item.cartId)}>
                                            <DeleteIcon></DeleteIcon>
                                          </IconButton>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </TableCell>
                                  <TableCell>
                                    <div style={{
                                      display: 'flex',
                                      width: '150px',
                                    }}>
                                      <IconButton onClick={() => handleDecrease(item.cartId)} disabled={item.quantity <= 1}>
                                        <RemoveIcon />
                                      </IconButton>
                                      <TextField
                                        value={item.quantity}
                                        inputProps={{
                                          readOnly: true,
                                          style: { textAlign: 'center' },
                                          min: 0,
                                        }}
                                      />
                                      <IconButton onClick={() => handleIncrease(item.cartId)}>
                                        <AddIcon />
                                      </IconButton>
                                    </div>

                                  </TableCell>
                                  <TableCell>
                                    {item.product ?
                                      (item.totalPrice / item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) :
                                      item.diamond.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                    }
                                  </TableCell>
                                  <TableCell>
                                    {item.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>

                          </Table>
                        </TableContainer>
                      </Grid>
                      <Grid item lg={4} md={4} sm={12} xs={12} sx={border}>
                        <Grid>
                          <h1>
                            Total: {totalPriceCalculate.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </h1>
                        </Grid>
                        <Container>
                          <Grid container columnSpacing={10}>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                              <div style={{
                                margin: '20px auto',
                                width: '250px',
                              }}>
                                <Button fullWidth onClick={() => navigate('/')} variant="contained" size="large" sx={colorContinueShopping}>
                                  Continue shopping
                                </Button>
                              </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                              <div style={{
                                margin: '20px auto',
                                width: 'auto',
                              }}>
                                <Button fullWidth onClick={confirmOrder} variant="contained" size="large" sx={colorPayment}>
                                  Confirm Order
                                </Button>
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                              <div style={{
                                margin: '20px auto',
                                width: 'auto',
                              }}>
                                <Button fullWidth onClick={() => navigate('/order')} variant="contained" size="large" sx={{
                                  backgroundColor: '#04376a',
                                  color: '#fff',
                                  '&:hover': {
                                    backgroundColor: '#04376a',
                                    color: '#fff',
                                  }
                                }}>
                                  Click here to go to your order
                                </Button>
                              </div>
                            </Grid>
                          </Grid>
                        </Container>
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
      }
    </div>
  )
}
