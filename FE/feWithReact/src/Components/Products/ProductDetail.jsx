import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Alert, TextField } from '@mui/material'
import { Box, Modal, } from '@mui/material'
import { styled, } from '@mui/material'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import './ProductDetail.css';
import { FormControl } from '@mui/material'
import { createApi } from '../../Auth/AuthFunction'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'
import './GetPageProduct.css'
import GppGoodIcon from '@mui/icons-material/GppGood';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [openSize, setOpenSize] = useState(false)
  const [productDetail, setProductDetail] = useState(null)
  const [currentTopImageIndex, setCurrentTopImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1)
  const [selectedSizeQuantity, setSelectedSizeQuantity] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [responseStatus, setResponseStatus] = useState('')
  const [voucherData, setVoucherData] = useState([])
  const [triggerVoucher, setTriggerVoucher] = useState(false)
  const [saleAllProduct, setSaleAllProduct] = useState(false)
  const [saleAllProductPercentage, setSaleAllProductPercentage] = useState()
  const [salePriceProduct, setSalePriceProduct] = useState([])
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
        setSelectedSizeQuantity(data?.productSizes?.[0]?.quantity)
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

  useEffect(() => {
    const url = createApi('Voucher/GetAllVoucher')
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setVoucherData(responseData)
        setTriggerVoucher(prev => !prev)
      })
      .catch((error) => console.error('Error:', error))
  }, [])

  useEffect(() => {
    if (voucherData.length > 0) {
      const hasSaleAllProduct = voucherData.some(item => item.isAllProduct)
      setSaleAllProduct(hasSaleAllProduct)
      setSaleAllProductPercentage(voucherData.find(item => item.isAllProduct)?.discountPercentage || 0)
      const newItems = voucherData.filter(item => !item.isAllProduct).map(item => ({
        productId: item.productId,
        discountPercentage: item.discountPercentage
      }))

      setSalePriceProduct(prev => {
        const existingProductIds = new Set(prev.map(item => item.productId))
        const itemsToAdd = newItems.filter(item => !existingProductIds.has(item.productId))
        return [...prev, ...itemsToAdd]
      })
    }
  }, [triggerVoucher, voucherData])

  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      minHeight: '70vh',
      paddingBottom: '50px',
    }}>
      {productDetail ? (
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
                    {
                      saleAllProduct ? (() => {
                        const itemSale = salePriceProduct.find(is => is.productId === productDetail.id)
                        return (
                          <div className='box' style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                            <div className='ribbon-2'>
                              {(itemSale?.discountPercentage || 0) + saleAllProductPercentage}% off
                            </div>
                          </div>
                        )
                      })() : (() => {
                        const itemSale = salePriceProduct.find(is => is.productId === productDetail.id)
                        if (!itemSale) return null
                        return (
                          <div className='box' style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                            <div className='ribbon-2'>
                              {(itemSale?.discountPercentage || 0) + saleAllProductPercentage}% off
                            </div>
                          </div>
                        )
                      })()
                    }
                    <img src={imageMain} style={{
                      width: '100%', // Suitable for mobile
                      maxWidth: '450px',
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
                width: '100%',
              }}>
                <h1>{productDetail?.name}</h1>
                <TableContainer sx={{
                  borderTop: '1px dashed black',
                  borderBottom: '1px dashed black',
                  width: '100%',
                }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                          <h4 style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>Material </h4>
                          <TextField value={productDetail?.diamondCase.name} />
                        </TableCell>
                      </TableRow>
                      {productDetail?.productParts.map((diamond, index) => (
                        <Fragment key={index}>
                          {
                            diamond.isMain ? (
                              <TableRow>
                                <TableCell sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}>
                                  <h4 style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>Main Diamond</h4>
                                  <TextField value={diamond.diamond.name}></TextField>
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow>
                                <TableCell sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}>
                                  <h4 style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>Extra Diamond</h4>
                                  <TextField value={diamond.diamond.name} />
                                </TableCell>
                              </TableRow>
                            )
                          }
                        </Fragment>
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
                              setSelectedSizeQuantity(size.quantity)
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
                      }}>How to Measure {productDetail?.category.name} Size</a>
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
                        {productDetail?.category.name === 'Ring' && (<img src="https://www.alexmakina.com/Data/EditorFiles/alex/Blog%20G%C3%B6rsel/Ring%20Size%20Measurement%20Using%20Thread%20or%20Floss.jpg" alt="" />)}
                        {productDetail?.category.name === 'EarDrop' && (<img src="https://i.pinimg.com/736x/7e/41/54/7e41543e3c3ff99eecf88e825656b4a2.jpg" alt="" />)}
                        {productDetail?.category.name === 'Pendant' && (<img src="https://media.tiffany.com/is/image/tiffanydm/SizeGuide-Necklacea?$tile$&wid=700&hei=700" alt="" />)}
                        {productDetail?.category.name === 'Bracelet' && (<img src="https://cdn.shopify.com/s/files/1/0272/2070/5377/files/GaussTherapy_bracelet-sizechart.jpg" alt="" />)}
                        {productDetail?.category.name === 'Bangles' && (<img src="https://www.blog1.trymintly.com/wp-content/uploads/2023/11/Bangles-Size-chart-1-2000x1020-1.jpg" alt="" />)}
                      </Box>
                    </Modal>
                  </div>
                  {
                    saleAllProduct ? (() => {
                      const itemSale = salePriceProduct.find(is => is.productId === productDetail.id)
                      return (
                        <div>
                          <div>
                            <h3 style={{
                              textDecoration: 'line-through',
                            }}>
                              {(
                                totalPrice / (1 - ((itemSale?.discountPercentage || 0) + saleAllProductPercentage) / 100)
                              ).toLocaleString()}$
                            </h3>
                          </div>
                        </div>
                      )
                    })() : (() => {
                      const itemSale = salePriceProduct.find(is => is.productId === productDetail.id)
                      if (!itemSale) return null
                      return (
                        <div>
                          <div>
                            <h3 style={{
                              textDecoration: 'line-through',
                            }}>
                              {(
                                totalPrice / (1 - ((itemSale?.discountPercentage || 0) + saleAllProductPercentage) / 100)
                              ).toLocaleString()}$
                            </h3>
                          </div>
                        </div>
                      )
                    })()
                  }
                  <div>
                    <h3 style={{ color: '#183471' }}>{totalPrice.toLocaleString()} $</h3>
                  </div>
                  {token ? (
                    selectedSizeQuantity && selectedSizeQuantity > 0 ? (
                      <AddToCartButton
                        type='submit'
                        variant='contained'
                        size='large'
                        onClick={() => submitForm(data)}
                      >
                        Add to cart
                      </AddToCartButton>
                    ) : (
                      <AddToCartButton
                        type='submit'
                        variant='contained'
                        size='large'
                        onClick={() => alert('Out of stock')}
                      >
                        Out of stock
                      </AddToCartButton>
                    )
                  ) : (
                    <AddToCartButton
                      type='submit'
                      variant='contained'
                      size='large'
                      onClick={() => navigate('/login')}
                    >
                      Add to cart
                    </AddToCartButton>
                  )}
                  {responseStatus ? (responseStatus.toString().startsWith('2') ? (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                      Add to cart successful
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      Add to cart failed
                    </Alert>
                  )) : null}
                </FormControl>
              </div>
              <br />
            </div>
          </div><br />
          <div className='row' style={{
            marginTop: '150px',
            borderTop: '1px solid black',
          }}>
            <div className='col'>
              <h2>
                <WorkspacePremiumIcon sx={{ fontSize: '2em' }}></WorkspacePremiumIcon>QUALITY COMMITMENT
              </h2>
              <p>
                <GppGoodIcon></GppGoodIcon>Jewelry/Jewelry Sets are 100% accurate in gold content and weight.
              </p>
              <p>
                <GppGoodIcon></GppGoodIcon>Natural diamonds are 100% imported with official certification and have world-class reputation and global value. Fully equipped with modern machinery and equipment to check quality and check diamond edge codes.
              </p>
            </div>
            <div className='col'>
              <h2>
                <LocalShippingIcon sx={{ fontSize: '2em' }}></LocalShippingIcon>ONLINE SHOPPING GUIDE
              </h2>
              <p>
                <GppGoodIcon></GppGoodIcon>You go to the product page to view the products posted on the Website
              </p>
              <p>
                <GppGoodIcon></GppGoodIcon> Add to cart.
              </p>
              <p>
                <GppGoodIcon></GppGoodIcon> Check order information and place an order
              </p>
              <p>
                <GppGoodIcon></GppGoodIcon>Check and confirm the order
              </p>
              <p>
                <GppGoodIcon></GppGoodIcon> The order will be pending approval by the system and after approval, you can pay by PayOS or VNPay. After that, your order will be handed over to the carrier.
              </p>
            </div>
          </div>
        </Container>
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          width: '100%',
        }}>
          <CircularProgress />
        </div>
      )}
    </div>

  )
}
