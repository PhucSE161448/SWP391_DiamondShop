import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Container, TableCell, Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import { TextField } from '@mui/material'

import { styled, } from '@mui/material'
import Button from '@mui/material/Button'

import { FormControl, } from '@mui/material'
import { createApi } from '../../Auth/AuthFunction'
export default function DiamondDetail() {
  // const navigate = useNavigate()
  const { id } = useParams()
  const [DiamondDetail, setDiamondDetail] = useState(null)
  const [currentTopImageIndex, setCurrentTopImageIndex] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [responseStatus, setResponseStatus] = useState('')
  const token = localStorage.getItem('token')


  useEffect(() => {
    const url = createApi(`Diamond/GetDiamondDetailById/${id}`)
    async function getDetailData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setDiamondDetail(data)
        setPrice(data.price * selectedQuantity)
      } catch (error) {
        console.error(error)
      }
    }
    getDetailData()
  }, [id])

  const handleSelectQuantity = (quantity) => {
    setSelectedQuantity(quantity)
  }

  const data = {
    id: id,
    quantity: selectedQuantity,
    price: price,
  }

  const submitForm = async (data) => {
    const body = {
      id: data.id,
      quantity: data.quantity,
      totalPrice: data.price
    }
    const url = createApi('Cart/Create?check=false')
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    })
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
        return DiamondDetail?.images.length - 4
      } else {
        return Math.max(prevIndex - 1, 0)
      }
    })
  }

  const handleDown = () => {
    setCurrentTopImageIndex(prevIndex => {
      if (prevIndex >= DiamondDetail?.images.length - 4) {
        return 0
      } else {
        return Math.min(prevIndex + 1, DiamondDetail?.images.length - 4)
      }
    })
  }

  const [imageMain, setImageMain] = useState(null)

  useEffect(() => {
    setImageMain(DiamondDetail?.images[0]?.urlPath)
  }, [DiamondDetail])

  const handleImageSelect = (image) => {
    setImageMain(image.urlPath)
  }

  const ITEM_HEIGHT = 120;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }
  // console.log(DiamondDetail)
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
                {DiamondDetail?.images.length > 4 && (
                  <Button onClick={handleUp}
                    sx={{
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <ChevronLeftIcon />
                  </Button>
                )}
                {DiamondDetail?.images.slice(currentTopImageIndex, currentTopImageIndex + 4).map((image, index) => (
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
                {DiamondDetail?.images.length > 4 && (
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
              <h1>{DiamondDetail?.name}</h1>
              <TableCell>
                <h5>Origin: {DiamondDetail?.origin}</h5>
              </TableCell>
              <TableCell>
                <h5>Carat weight: {DiamondDetail?.caratWeight}</h5>
              </TableCell>
              <TableCell>
                <h5>Clarity: {DiamondDetail?.clarity}</h5>
              </TableCell>
              <TableCell>
                <h5>Color: {DiamondDetail?.color}</h5>
              </TableCell>
              <TableCell>
                <h5>Cut: {DiamondDetail?.cut}</h5>
              </TableCell>
              <br />

              <FormControl sx={{
                width: '300px',
              }}>
                <h3 style={{ color: '#183471' }}>{price.toLocaleString()} $</h3>
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
              </FormControl>
              {responseStatus ? (responseStatus.toString().startsWith('2') ? (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  Add to cart successful
                </Alert>
              ) : (
                <Alert severity="error">
                  Add to cart failed
                </Alert>
              )) : null}
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
              fontSize: '1vw',
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
