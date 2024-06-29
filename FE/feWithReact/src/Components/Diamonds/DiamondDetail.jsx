import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Container, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

import { TextField } from '@mui/material'

import { styled, } from '@mui/material'
import Button from '@mui/material/Button'

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
export default function DiamondDetail() {
  // const navigate = useNavigate()
  const { id } = useParams()
  const [DiamondDetail, setDiamondDetail] = useState(null)
  const [currentTopImageIndex, setCurrentTopImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const token = localStorage.getItem('token')


  useEffect(() => {
    async function getDetailData() {
      try {
        const response = await fetch(`https://localhost:7122/api/Diamond/GetDiamondDetailById/${id}`)
        const data = await response.json()
        setDiamondDetail(data)
        setSelectedSize(data?.DiamondSizes?.[0]?.size)
        setTotalPrice(data?.DiamondSizes?.[0]?.price * selectedQuantity)
      } catch (error) {
        console.error(error)
      }
    }
    getDetailData()
  }, [id])

  const handleSelectSize = (size) => {
    setSelectedSize(size)
  }

  const handleSelectQuantity = (quantity) => {
    setSelectedQuantity(quantity)
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
      totalPrice: data.totalPrice
    }
    // console.log(body)
    // const response = await fetch('https://localhost:7122/api/Cart/Create?check=false', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   body: JSON.stringify(body),
    // });
    // console.log(response)
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
              <TableContainer sx={{
                borderTop: '1px dashed black',
                borderBottom: '1px dashed black',
                width: 'auto',
              }}>
                <Table>
                  {console.log(DiamondDetail)}
                  {/* <TableBody>
                    {DiamondDetail?.DiamondParts.map((diamond, index) => (
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
                  </TableBody> */}
                </Table>
              </TableContainer><br />

              <FormControl sx={{
                width: '300px',
              }}>
                <InputLabel id="size">Size</InputLabel>
                <Select
                  label="Size"
                  onChange={e => {
                    const newSize = e.target.value;
                    handleSelectSize(newSize);
                    const newPrice = DiamondDetail?.DiamondSizes?.find(size => size.size === newSize)?.price * selectedQuantity;
                    setTotalPrice(newPrice)
                  }}
                  value={selectedSize}
                  MenuProps={MenuProps}
                >
                  {DiamondDetail?.DiamondSizes?.map((size, index) => (
                    <MenuItem key={index} value={size.size}>
                      {size.size}
                    </MenuItem>
                  ))}
                </Select> <br />
                <TextField
                  label="Quantity"
                  type="number" // Ensure input is treated as a number
                  onChange={e => {
                    const newQuantity = parseInt(e.target.value, 10); // Parse the quantity as an integer
                    handleSelectQuantity(newQuantity);
                    // Ensure we use the correct size to find the price
                    const newPrice = DiamondDetail?.DiamondSizes?.find(size => size.size === selectedSize)?.price * newQuantity;
                    setTotalPrice(newPrice)
                  }}
                  value={selectedQuantity}
                  inputProps={{ min: 1 }}
                />
                <h3 style={{ color: '#183471' }}>{totalPrice.toLocaleString()} $</h3>
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
