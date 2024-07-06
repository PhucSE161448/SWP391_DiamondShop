import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Alert } from '@mui/material'
import { Box, Modal, } from '@mui/material'
import { styled, } from '@mui/material'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import './ProductDetail.css';
import { FormControl } from '@mui/material'
import { createApi } from '../../Auth/AuthFunction'
export default function ProductDetail() {
  // const navigate = useNavigate()
  const { id } = useParams()
  const [openSize, setOpenSize] = useState(false)
  const [productDetail, setProductDetail] = useState(null)
  const [currentTopImageIndex, setCurrentTopImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [responseStatus, setResponseStatus] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const token = localStorage.getItem('token')

  const handleOpen = () => setOpenSize(true)
  const handleClose = () => setOpenSize(false)

  useEffect(() => {
    const url = createApi(`Product/GetProductDetailById/${id}`)
    async function getDetailData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setProductDetail(data)
        setSelectedSize(data?.productSizes?.[0]?.size)
        setTotalPrice(data?.productSizes?.[0]?.price * selectedQuantity)
      } catch (error) {
        console.error(error)
      }
    }
    getDetailData()
  }, [id])

  const handleSelectSize = (size) => {
    setSelectedSize(size)
  }


  const data = {
    id: id,
    quantity: selectedQuantity,
    totalPrice: totalPrice,
  }

  const submitForm = async (data) => {
    const body = {
      id: data.id,
      quantity: data.quantity,
      totalPrice: data.totalPrice,
      size: selectedSize,
    }
    const url = createApi('Cart/Create?check=true')
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    });
    setResponseStatus(response.status)
  }

  const AddToCartButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#ad2a36'),
    backgroundColor: '#ad2a36',
    '&:hover': {
      backgroundColor: ' #a32222',
    },
  }))

  const handleUp = () => {
    setCurrentTopImageIndex(prevIndex => {
      if (prevIndex === 0) {
        return productDetail?.images.length - 4
      } else {
        return Math.max(prevIndex - 1, 0)
      }
    })
  }

  const handleDown = () => {
    setCurrentTopImageIndex(prevIndex => {
      if (prevIndex >= productDetail?.images.length - 4) {
        return 0
      } else {
        return Math.min(prevIndex + 1, productDetail?.images.length - 4)
      }
    })
  }

  const [imageMain, setImageMain] = useState(null)

  useEffect(() => {
    setImageMain(productDetail?.images[0]?.urlPath)
  }, [productDetail])

  const handleImageSelect = (image) => {
    setImageMain(image.urlPath)
  }

  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}>
      <Container>
        <div className='container-fluid' >
          <div className='row displayDetail' style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <div className='col' style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '5vh',
            }}>
              <div className='col'>
                <div className='col' style={{
                  paddingTop: '5vh',
                }}>
                  <img src={imageMain} style={{
                    width: '100%', // Suitable for mobile
                    maxWidth: '600px',
                    borderRadius: '20px',
                  }} />
                </div>
              </div>

              <div style={{
                display: 'flex',
                overflowX: 'auto',
                maxWidth: '650px',
              }}>
                {productDetail?.images.length > 4 && (
                  <Button onClick={handleUp}
                    sx={{
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <ChevronLeftIcon />
                  </Button>
                )}
                {productDetail?.images.slice(currentTopImageIndex, currentTopImageIndex + 4).map((image, index) => (
                  <li style={{
                    listStyle: 'none',
                    '&:hover': {
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                    }
                  }} key={index}>
                    <img src={image.urlPath} style={{
                      width: '100px',
                      maxWidth: '10vw',
                      margin: '10px',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      transition: 'opacity 0.5s ease', // Add this line
                      opacity: image.urlPath === imageMain ? 1 : 0.5, // Adjust opacity based on selection
                      ...(image.urlPath === imageMain ? {
                        border: '3px solid #ffdc73',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                      } : {}),
                    }} onClick={() => handleImageSelect(image)} />
                  </li>
                ))}
                {productDetail?.images.length > 4 && (
                  <Button onClick={handleDown}
                    sx={{
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    size="small">
                    <ChevronRightIcon />
                  </Button>
                )}
              </div>
            </div>

            <div className='col' style={{
              margin: '1vh 1vw',
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <h1>{productDetail?.name}</h1>
              <TableContainer sx={{
                borderTop: '1px dashed black',
                borderBottom: '1px dashed black',
                width: 'auto',
              }}>
                <Table>
                  <TableBody>
                    {productDetail?.productParts.map((diamond, index) => (
                      <TableRow key={index} >
                        {diamond.isMain ? (
                          <TableCell>
                            <h4>Main Diamond: {diamond.diamond.name}</h4>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <h4>Extra Diamond {diamond.diamond.name}</h4>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer><br />

              <FormControl sx={{
                width: '300px',
              }}>
                <div className='row'>
                  <div>Size</div>
                  <div className='col'>
                    <div>
                      {productDetail?.productSizes?.map((size, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          onClick={() => {
                            handleSelectSize(size.size);
                            const newPrice = size.price * selectedQuantity;
                            setTotalPrice(newPrice);
                          }}
                          sx={{
                            margin: '5px',
                            color: selectedSize === size.size ? 'white' : 'black',
                            backgroundColor: selectedSize === size.size ? '#ad2a36' : 'transparent',
                            border: selectedSize === size.size ? '1px solid #ad2a36' : '1px solid black',
                            height: '64px',
                            borderRadius: '20px',
                            '&:hover': {
                              backgroundColor: '#ad2a36',
                              color: 'white',
                              border: '1px solid #ad2a36',
                            }
                          }}
                        >
                          {size.size}
                        </Button>
                      ))}
                    </div> <br />
                  </div>
                </div>
                <div>
                  <div>
                    <a onClick={handleOpen} style={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '20px',
                    }}>How to Measure Ring Size</a>
                  </div>
                  <Modal
                    open={openSize}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'background.paper',
                      p: 4,
                      overflow: 'auto',
                    }}>
                      <img src="https://www.alexmakina.com/Data/EditorFiles/alex/Blog%20G%C3%B6rsel/Ring%20Size%20Measurement%20Using%20Thread%20or%20Floss.jpg" alt="" />
                    </Box>
                  </Modal>
                </div>
                <div>
                  <h3 style={{ color: '#183471' }}>{totalPrice.toLocaleString()} $</h3>
                </div>
                {token ? (
                  <AddToCartButton
                    type='submit'
                    variant='contained'
                    size='large'
                    onClick={() => submitForm(data)}
                  >
                    Add to cart
                  </AddToCartButton>
                ) : (
                  <h4 style={{ color: '#ad2a36' }}>
                    Please login to add to cart
                  </h4>
                )}
                {responseStatus.toString().startsWith('2') && (
                  <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Add to cart successful
                  </Alert>
                )}
              </FormControl>
            </div>
            <br />
          </div>
          <div style={{
            padding: '5vh',
            textAlign: 'center',
          }}>
            <h2>Details</h2>
            <p>
              Hello
            </p>

            <h2>Descriptions</h2>
            <p style={{
              textAlign: 'justify',
              fontSize: '20px',
            }}>
              Authentic with a special design combining two types of white gold and yellow gold, creating a strong, masculine and luxurious style.
              Exquisitely crafted to every detail and flexible according to needs: freely change the color/gold age and freely change the size of the main stone,
              Authentic is a meaningful gift that brings success, luxury and shows class for gentlemen.
            </p>
          </div>
        </div >

      </Container>
    </div>

  )
}
