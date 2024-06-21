import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { styled, } from '@mui/material'
import Button from '@mui/material/Button'
import shadows from '@mui/material/styles/shadows'
export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [currentTopImageIndex, setCurrentTopImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelectSize = (size) => {
    setSelectedSize(size)
  }
  function calculatePrice(price1, price2, price3) {
    return price1 + price2 + price3
  }

  const AddToCartButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#ad2a36'),
    backgroundColor: '#ad2a36',
    '&:hover': {
      backgroundColor: ' #a32222',
    },
  }));

  const handleUp = () => {
    setCurrentTopImageIndex(prevIndex => {
      if (prevIndex === 0) {
        return productDetail?.images.length - 5
      } else {
        return Math.max(prevIndex - 1, 0)
      }
    })
  }

  const handleDown = () => {
    setCurrentTopImageIndex(prevIndex => {
      if (prevIndex >= productDetail?.images.length - 5) {
        return 0
      } else {
        return Math.min(prevIndex + 1, productDetail?.images.length - 5)
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
  // console.log(productDetail)
  return (
    <div className='container-fluid' style={{
      width: '90vw',
      backgroundColor: 'rgba(0,0,0,0.1)',

    }}>
      <div className='row'>
        <div className='col row'>
          <div className='col-3  '>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {productDetail?.images.length > 5 && (
                <Button onClick={handleUp}
                  sx={{
                    width: '100px',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <KeyboardArrowUpIcon />
                </Button>
              )}
              <div >
                {productDetail?.images.slice(currentTopImageIndex, currentTopImageIndex + 5).map((image, index) => (
                  <li style={{
                    listStyle: 'none',
                    '&:hover': {
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                    }
                  }} key={index}>
                    <img src={image.urlPath} style={{
                      width: '100px',
                      margin: '10px',
                      cursor: 'pointer',

                    }} onClick={() => handleImageSelect(image)} />
                  </li>
                ))}
              </div>
              {productDetail?.images.length > 5 && (
                <Button onClick={handleDown}
                  sx={{
                    width: '100px',
                    color: 'black',
                  }}>
                  <KeyboardArrowDownIcon />
                </Button>
              )}
            </div>
          </div>
          <div className='col' style={{
            paddingTop: '5vh',
          }}>
            <img src={imageMain} style={{
              maxWidth: '550px',
              height: 'auto',
              width: 'auto',
            }} />
          </div>

        </div>
        <div className='col-5' style={{
          paddingTop: '5vh',
        }}>
          <h1>{productDetail?.name}</h1>
          <p>Category: {productDetail?.category?.name}</p>
          {productDetail?.productSizes && productDetail?.productSizes.map((size, index) => (
            <Button
              key={index}
              sx={{
                width: '50px',
                height: '50px',

                borderRadius: '10px',
                border: '1px solid black',
                margin: '10px',
                padding: 0,
                color: selectedSize === size.size ? '#fff' : '#000',
                backgroundColor: selectedSize === size.size ? '#003468' : 'transparent',
              }}
              onClick={() => handleSelectSize(size.size)}
            >
              {size.size}
            </Button>
          ))}
          <br />

          <AddToCartButton
            onClick={() => navigate('/cart')}
            variant='contained'
            size='large'>Add to cart</AddToCartButton>
        </div>
      </div>

    </div>
  )
}
