import React, { useEffect, useState } from 'react'
import { Grid, Container, Box, Button, Table, TableContainer, TableHead, TableCell, TableRow, TableBody, TextField, Alert } from '@mui/material'
import { Modal } from '@mui/material'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createApi } from '../Auth/AuthFunction'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { jwtDecode } from 'jwt-decode'
export default function Cart() {
  const [isEmpty, setIsEmpty] = useState(null)
  const [cart, setCart] = useState([])
  const [cartId, setCartId] = useState([])
  const [totalPriceCalculate, setTotalPriceCalculate] = useState(0)
  const [triggerRead, setTriggerRead] = useState(false)
  const token = localStorage.getItem('token')
  const dataTableHead = ['#', 'Product', 'Price', 'Quantity', 'Total amount', '']
  const [userDetail, setUserDetail] = useState(null)
  const [id, setId] = useState(null)
  useEffect(() => {
    if (token === null) {
      navigate('/login')
    } else {
      setUserDetail(jwtDecode(localStorage.getItem('token')))
      setId(jwtDecode(localStorage.getItem('token')).Id)
    }
  }, [token])
  const [dataUser, setDataUser] = useState(null)

  useEffect(() => {
    const getUserData = (id) => {
      const url = createApi(`Account/GetAccountById/${id}`)
      console.log(url)
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      ).then(response =>
        response.json()
      ).then(responseJson =>
        setDataUser(responseJson)
      )
    }
    getUserData(id)
  }, [id])
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


  function debounce(func, delay) {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const handleDecrease = debounce(async (id) => {
    const url = createApi(`Cart/Update/${id}?check=false`);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTriggerRead(prev => !prev);
  }, 1000);

  const handleDeleteCart = debounce(async (id) => {
    const url = createApi(`Cart/Delete/${id}`);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTriggerRead(prev => !prev);
  }, 1000);

  const handleIncrease = debounce(async (id) => {
    const url = createApi(`Cart/Update/${id}?check=true`);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setTriggerRead(prev => !prev);
  }, 1000);

  useEffect(() => {
    const calculatePrice = () => {
      let total = 0
      cart.map((item) => {
        total += item.totalPrice
        setTotalPriceCalculate(total)
      })
    }
    calculatePrice()
  }, [cart])

  const confirmOrder = (values) => {
    const data = {
      totalPrice: totalPriceCalculate,
      cartId: cartId,
      address: values.address,
      phone: values.phoneNumber,
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

  const initialValues = {
    totalPrice: '',
    cartId: '',
    address: '',
    phoneNumber: '',
  }

  const validationSchema = Yup.object({
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    confirmOrder(values)
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
                      <Grid item lg={6} md={9} sm={12} xs={12} sx={border}>
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
                                        <img src={item.product ? item.product.images[0]?.urlPath : item.diamond.images[0]?.urlPath} alt="" style={{
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
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignContent: 'flex-start'
                                          }}>
                                            <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{item.product ? item.product.name : item.diamond.name}</p>
                                            {item.product ? (
                                              <p style={{ fontSize: '20px' }}>Size(ni): {item.size}</p>
                                            ) : (
                                              <p style={{ fontSize: '20px' }}>
                                                {item.diamond.caratWeight} / {item.diamond.color} / {item.diamond.clarity} / {item.diamond.cut}
                                              </p>
                                            )}
                                          </h4>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </TableCell>

                                  <TableCell>
                                    {item.product ?
                                      (item.totalPrice / item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) :
                                      item.diamond.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                    }
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
                                    {item.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                  </TableCell>
                                  <TableCell>
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      alignItems: 'center',
                                    }}>
                                      <IconButton color='error' onClick={() => handleDeleteCart(item.cartId)}>
                                        <DeleteIcon></DeleteIcon>
                                      </IconButton>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>

                          </Table>
                        </TableContainer>
                      </Grid>
                      <Grid item lg={4} md={3} sm={12} xs={12} sx={border}>

                        {dataUser && (
                          <Container sx={{
                            padding: '24px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(10px)',
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'center',

                              width: '100%',
                            }}>

                              <h3>Customer information</h3>
                            </div>
                            <Formik
                              initialValues={initialValues}
                              validationSchema={validationSchema}
                              onSubmit={onSubmit}
                            >
                              {({ handleChange, values, setFieldValue }) => {
                                useEffect(() => {
                                  setFieldValue('cartId', cartId)
                                  setFieldValue('totalPrice', totalPriceCalculate)
                                  setFieldValue('phoneNumber', dataUser?.phoneNumber)
                                  setFieldValue('address', dataUser?.address)
                                }, [dataUser])
                                return (
                                  <Form>
                                    <div className='row'>
                                      <div className='col'>
                                        <Field
                                          as={TextField}
                                          type="text"
                                          name="phoneNumber"
                                          label="Phone number"
                                          onChange={handleChange}
                                          sx={{
                                            width: '100%'
                                          }}
                                        />
                                        <ErrorMessage name="phoneNumber" >
                                          {msg => <Alert severity="error">{msg}</Alert>}
                                        </ErrorMessage>
                                      </div>
                                      <div className='col-12' style={{
                                        margin: '15px 0',
                                      }}>
                                        <Field
                                          as={TextField}
                                          type="text"
                                          name="address"
                                          label="Address"
                                          onChange={handleChange}
                                          sx={{
                                            width: '100%'
                                          }}
                                        />
                                        <ErrorMessage name="address" >
                                          {msg => <Alert severity="error">{msg}</Alert>}
                                        </ErrorMessage>
                                      </div>
                                    </div>
                                    <div>
                                      <h3>
                                        Total: {totalPriceCalculate.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </h3>
                                    </div>
                                    <Button type="submit"
                                      className='submitButton'
                                      value="Submit" variant="contained"
                                      size="large"
                                      sx={colorPayment}>
                                      Confirm Order
                                    </Button>
                                  </Form>
                                )
                              }}
                            </Formik>
                          </Container>
                        )}
                        <Container>
                          <Grid container columnSpacing={10}>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                              <div style={{
                                margin: '20px auto',
                                width: '100%',
                              }}>
                                <Button fullWidth onClick={() => navigate('/')} variant="contained" size="large" sx={colorContinueShopping}>
                                  Continue shopping
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
    </div >
  )
}
