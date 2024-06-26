import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Form, Formik, Field, ErrorMessage, } from 'formik'
import { Alert } from '@mui/material'
import * as Yup from 'yup';
import { styled, } from '@mui/material'
import Button from '@mui/material/Button'
import './ProductDetail.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [currentTopImageIndex, setCurrentTopImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelectSize = (size) => {
    setSelectedSize(size)
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

  const validationSchema = Yup.object({
    mainDiamond: Yup.number().required('Required'),
    extraDiamond: Yup.number().required('Required'),
    size: Yup.number().required('Required'),
  })

  const initialValues = {
    mainDiamond: productDetail?.productParts?.find(part => part.isMain)?.diamond?.id || '',
    extraDiamond: productDetail?.productParts?.find(part => !part.isMain)?.diamond?.id || '',
    size: '',
  }

  const onSubmit = (values) => {
    console.log(values)
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, values }) => (
              <Form>
                <div className='col' style={{
                  paddingTop: '5vh',
                }}>
                  <h1>{productDetail?.name}</h1>
                  <p>Category: {productDetail?.category?.name}</p>
                  <div>
                    <div className='row' style={{
                      marginBottom: '20px',
                    }}>
                      <div className='col-3' style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        <h3>Main diamond</h3>
                      </div>
                      <div className='col'>
                        <FormControl sx={{
                          width: '300px',
                        }}>
                          <InputLabel>Main diamond</InputLabel>
                          <Field
                            name="mainDiamond"
                            id="mainDiamond"
                            as={Select}
                            label="Main diamond"
                            onChange={handleChange}
                            value={values.mainDiamond}
                            MenuProps={MenuProps}
                          >
                            {
                              productDetail?.productParts
                                .filter(part => part.isMain) // Filter parts where isMain is true
                                .map((part, index) => (
                                  <MenuItem key={index}
                                    value={part.diamond.id}
                                  >
                                    {part.diamond.name}
                                  </MenuItem>
                                ))
                            }
                          </Field>
                          <ErrorMessage name='mainDiamond'>
                            {msg => <Alert severity="error">{msg}</Alert>}
                          </ErrorMessage>
                        </FormControl>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3' style={{
                        display: 'flex',

                        alignItems: 'center',
                      }}>
                        <h3>Extra diamond</h3>
                      </div>
                      <div className='col'>
                        <FormControl sx={{
                          width: '300px',
                        }}>
                          <InputLabel>Extra diamond</InputLabel>
                          <Field
                            name="extraDiamond"
                            id="extraDiamond"
                            as={Select}
                            label="Extra diamond"
                            onChange={handleChange}
                            value={values.extraDiamond}
                            MenuProps={MenuProps}
                          >
                            {
                              productDetail?.productParts
                                .filter(part => !part.isMain) // Filter parts where isMain is true
                                .map((part, index) => (
                                  <MenuItem key={index}
                                    value={part.diamond.id}>
                                    {part.diamond.name}
                                  </MenuItem>
                                ))
                            }
                          </Field>
                          <ErrorMessage name='extraDiamond'>
                            {msg => <Alert severity="error">{msg}</Alert>}
                          </ErrorMessage>
                        </FormControl>
                      </div>
                    </div>
                  </div> <br />
                  <div className='row'>
                    <div className='col-3' style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <h3>Size</h3>
                    </div>
                    <div className='col'>
                      <FormControl sx={{
                        width: '300px',
                      }}>
                        <InputLabel>Size</InputLabel>
                        <Field
                          name="size"
                          id="size"
                          as={Select}
                          label="Size"
                          onChange={handleChange}
                          value={values.size}
                          MenuProps={MenuProps}
                        >
                          {productDetail?.productSizes && productDetail?.productSizes.map((size, index) => (
                            <MenuItem key={index}
                              value={size.id}
                              onClick={() => {
                                handleSelectSize(size.size)
                              }}>
                              {size.size}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name='size'>
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <br />
                  <AddToCartButton
                    type='submit'
                    variant='contained'
                    size='large'>Add to cart</AddToCartButton>
                </div>
              </Form>
            )}
          </Formik>
          {productDetail?.productSizes && productDetail?.productSizes.map((size, index) => (
            size.size === selectedSize && (
              <h3 key={index}
                value={size.id}
              >
                Price: {size.price.toLocaleString()} $
              </h3>
            )
          ))}
        </div>
      </div>
    </div >
  )
}
