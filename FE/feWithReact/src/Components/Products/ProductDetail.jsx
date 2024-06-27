import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { Alert, TextField } from '@mui/material'
import * as Yup from 'yup';
import { styled, } from '@mui/material'
import Button from '@mui/material/Button'
import './ProductDetail.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
export default function ProductDetail() {
  // const navigate = useNavigate()
  const { id } = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [currentTopImageIndex, setCurrentTopImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
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
    try {
      const response = await fetch('https://localhost:7122/api/Cart/Create?check=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
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

  useEffect(() => {
    async function getDetailData() {
      try {
        const response = await fetch(`https://localhost:7122/api/Product/GetProductDetailById/${id}`)
        const data = await response.json()
        setProductDetail(data)
      } catch (error) {
        console.error(error)
      }
    }
    getDetailData()
  }, [id])

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
  // console.log(productDetail)
  return (
    <div className='container-fluid' style={{
      width: '90vw',
      backgroundColor: 'rgba(0,0,0,0.1)',

    }}>
      <div className='row displayDetail' style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div className='col' style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className='col' style={{
            paddingTop: '5vh',
          }}>
            <img src={imageMain} style={{
              width: '100%', // Suitable for mobile
              maxWidth: '600px'
            }} />
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
          paddingTop: '5vh',
        }}>
          <h1>{productDetail?.name}</h1>
          <p>Category: {productDetail?.category?.name}</p>
          {productDetail?.productParts.map((diamond, index) => (
            <div key={index}>
              {diamond.isMain ? (
                <div>
                  <h4>Main Diamond: {diamond.diamond.name}</h4>
                </div>
              ) : (
                <div>
                  <h4>Extra Diamond {diamond.diamond.name}</h4>
                </div>
              )}
            </div>
          ))}
          <FormControl sx={{
            width: '300px',
          }}>
            <InputLabel id="size">Size</InputLabel>
            <Select
              label="Size"
              onChange={e => {
                const newSize = e.target.value;
                handleSelectSize(newSize);
                const newPrice = productDetail?.productSizes?.find(size => size.size === newSize)?.price * selectedQuantity;
                setTotalPrice(newPrice)
              }}
              value={selectedSize}
              MenuProps={MenuProps}

            >
              {productDetail?.productSizes?.map((size, index) => (
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
                const newPrice = productDetail?.productSizes?.find(size => size.size === selectedSize)?.price * newQuantity;
                setTotalPrice(newPrice)
              }}
              value={selectedQuantity}
              inputProps={{ min: 1 }}
            />
            <h3>Total Price: {totalPrice.toLocaleString()} $</h3>
            <AddToCartButton
              type='submit'
              variant='contained'
              size='large'
              onClick={() => submitForm(data)}
            >
              Add to cart
            </AddToCartButton>
          </FormControl>
        </div>
        <br />
      </div>
    </div >

  )
}
