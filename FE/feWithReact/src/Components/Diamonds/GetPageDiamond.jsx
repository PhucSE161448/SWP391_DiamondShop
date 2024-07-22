import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState, useCallback } from 'react'
import {
  Stack, Pagination, CardMedia, FormControl, InputLabel,
  Select, MenuItem, Slider, Button, TextField
} from '@mui/material'
import { debounce, set } from 'lodash';
import { Link } from 'react-router-dom'
import { createApi } from '../../Auth/AuthFunction'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
export default function GetPageDiamond() {
  const token = localStorage.getItem('token')
  const [searchParams] = useSearchParams()
  const [PageNumber, setPageNumber] = useState(searchParams.get('pageNumber'))
  const [nameDiamond, setNameDiamond] = useState(searchParams.get('name'))
  const [PageSize, setPageSize] = useState(12)
  const [StartPrice, setStartPrice] = useState(null)
  const [EndPrice, setEndPrice] = useState(null)
  const [Price, setPrice] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const dataColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const dataClarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
  const dataCut = ["Excellent", "VeryGood", "Good", "Fair", "Poor"].reverse()
  const [dataCaratWeightStart, setDataCaratWeightStart] = useState(0.1)
  const [dataCaratWeightEnd, setDataCaratWeightEnd] = useState(10.2)
  const [valueColor, setValueColor] = useState([0, dataColors.length - 1])
  const [valueClarity, setValueClarity] = useState([0, dataClarity.length - 1])
  const [valueCut, setValueCut] = useState([0, dataCut.length - 1])
  const navigate = useNavigate()
  const [order, setOrder] = useState({ OrderByDesc: searchParams.get('OrderBy'), SortBy: '' })

  const handleChangeNameDiamond = (value) => {
    setData(null)
    setNameDiamond(value)
    navigate(`/diamondPage?pageNumber=1&OrderBy=${order.OrderByDesc}&name=${value}`)
    setTriggerRead(prev => !prev)
  }

  const debounce = (func, delay) => {
    let debounceTimer
    return function () {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
  }

  const debouncedHandleChangeNameDiamond = debounce(handleChangeNameDiamond, 500)

  const handleChangeOrder = (value, type) => {
    setData(null)
    navigate(`/diamondPage?pageNumber=1&OrderBy=${value}&name=${nameDiamond}`)
    if (value === null) {
      setOrder({ OrderByDesc: null, SortBy: '' })
    } else {
      setOrder({ OrderByDesc: value, SortBy: type })
      setTriggerRead(prev => !prev)
    }
  }

  const addToCart = async (data) => {
    const body = {
      id: data.id,
      quantity: 1,
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
  }

  const handleChangeColor = debounce((newValue) => {
    setValueColor(newValue);
    setTriggerRead(prev => !prev);
  }, 500)

  const handleChangeClarity = debounce((newValue) => {
    setValueClarity(newValue)
    setTriggerRead(prev => !prev)
  }, 500)

  const handleChangeCut = debounce((newValue) => {
    setValueCut(newValue)
    setTriggerRead(prev => !prev)
  }, 500)

  const handleChangeCaratWeight = debounce((newValue) => {
    setDataCaratWeightStart(Number(newValue[0]).toFixed(1))
    setDataCaratWeightEnd(Number(newValue[1]).toFixed(1))
    setTriggerRead(prev => !prev)
  }, 500)

  const handlePageChange = (event, value) => {
    navigate(`/diamondPage?pageNumber=${value}&OrderBy=${order.OrderByDesc}`)
    setPageNumber(value)
    setTriggerRead(prev => !prev)
  }

  const selectedColor = dataColors.slice(valueColor[0], valueColor[1] + 1)
  const selectedClarities = dataClarity.slice(valueClarity[0], valueClarity[1] + 1)
  const selectedCut = dataCut.slice(valueCut[0], valueCut[1] + 1)

  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(StartPrice != null && { StartPrice: StartPrice }),
      ...(EndPrice != null && { EndPrice: EndPrice }),
      ...(order.OrderByDesc !== null && { OrderByDesc: order.OrderByDesc }),
      ...(order.SortBy !== null && { SortBy: order.SortBy }),
      ...(selectedColor !== null && { Colors: selectedColor }),
      ...(selectedClarities !== null && { Clarities: selectedClarities }),
      ...(valueCut !== null && { Cuts: selectedCut }),
      ...(dataCaratWeightStart !== null && { StartCaratWeight: dataCaratWeightStart }),
      ...(dataCaratWeightEnd !== null && { EndCaratWeight: dataCaratWeightEnd }),
      ...(nameDiamond !== null && { Name: nameDiamond }),
    },
  }

  const ITEM_HEIGHT = 120
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }

  const styleSlider = {
    color: '#04376a',
    width: '20vw',
    '@media (max-width: 1200px)': {
      width: '80vw',
    },
    '& .MuiSlider-thumb': {
      height: 18,
      width: 18,
      backgroundColor: '#eedfbf',
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {
      height: 5,
    },
    '& .MuiSlider-rail': {
      color: '#04376a',
      opacity: 0.4,
      height: 3,
    },
  }

  const styleSliderContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 0
  }

  useEffect(() => {
    function ReadPageData() {
      let queryString = new URLSearchParams()
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        if (key === 'Colors' && Array.isArray(value)) { // Check if value is an array
          value.forEach((id) => { // Iterate over the array
            queryString.append(`${key}`, id)
          })
        } else if (key === 'Clarities' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id)
          })
        } else if (key === 'Cuts' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id)
          })
        } else if ((key === 'StartPrice' || key === 'EndPrice') && !Array.isArray(value)) {
          queryString.append(`${key}`, value)
        } else if ((key === 'StartCaratWeight' || key === 'EndCaratWeight') && !Array.isArray(value)) {
          queryString.append(`${key}`, value)
        } else if (key === 'Name') {
          queryString.append(`${key}`, value)
        } else {
          queryString.append(`queryDTO.${key}`, value)
        }
      })
      const url = createApi(`Diamond/GetPagedDiamonds?${queryString.toString()}`)
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setData(data.items)
          setTotalPage(Math.ceil(data.totalItemsCount / PageSize))
        })
        .catch(error => {
          // Xử lý lỗi ở đây
          console.error(error)
        })
    }
    ReadPageData()
  }, [triggerRead])

  const handleSelectPrice = (value) => {
    if (value === null) {
      setStartPrice(null)
      setEndPrice(null)
    } else {
      const [start, end] = value.split('-')
      setStartPrice(start)
      setEndPrice(end)
    }
    setPrice(value)
    setTriggerRead(prev => !prev)
  }

  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}>
      <Grid container spacing={2} sx={{
        paddingTop: '20px',
        paddingBottom: '20px',
        margin: '0px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}>
        <Grid xs={12} sm={12} md={3} sx={{
          margin: '20px',
        }}>
          <FormControl fullWidth>
            <InputLabel>
              Order by price
            </InputLabel>
            <Select
              label="Order by price"
              MenuProps={MenuProps}
              value={order.OrderByDesc}
              onChange={(e) => {
                handleChangeOrder(e.target.value, 'price');
              }}
            >
              <MenuItem value={false}>Ascending</MenuItem>
              <MenuItem value={true}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} md={3} sx={{
          margin: '20px',
        }}>
          <FormControl fullWidth>
            <InputLabel>
              Order by price range
            </InputLabel>
            <Select
              label="Order by price range"
              MenuProps={MenuProps}
              value={Price}
              onChange={(e) => handleSelectPrice(e.target.value)}
            >
              {
                Array.from({ length: (100000 - 1000) / 15000 }, (_, index) => {
                  const start = 1000 + (15000 * index);
                  const end = start + 15000;
                  return (
                    <MenuItem key={index} value={`${start}-${end}`}>
                      ${start.toLocaleString()} - ${end.toLocaleString()}
                    </MenuItem>
                  );
                })
              }
              <MenuItem value={null}>Default</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12} md={3} sx={{
          margin: '20px',
        }}>
          <FormControl fullWidth>
            <TextField
              label="Search"
              variant="outlined"
              onChange={(e) => debouncedHandleChangeNameDiamond(e.target.value)}
              sx={{
                width: '100%',
              }}
            >
            </TextField>
          </FormControl>
        </Grid>

      </Grid>
      <Grid container spacing={2} sx={{
        padding: '20px 0 20px 0',
        margin: '0px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <Grid container spacing={2} item xs={12} sm={12} md={12} lg={3} sx={styleSliderContainer}>
          <Grid>
            <h3 style={{
              marginRight: '30px'
            }}>
              Carat weight
            </h3>
          </Grid>
          <Grid>
            <Box sx={{ padding: 0 }}>
              <Slider
                min={0.1}
                max={10.2}
                value={[dataCaratWeightStart, dataCaratWeightEnd]}
                onChange={(_, newValue) => {
                  handleChangeCaratWeight(newValue)
                }}
                aria-labelledby="range-slider"
                getAriaValueText={(value) => `${Number(value).toFixed(1)}`}
                valueLabelFormat={(value) => `${Number(value).toFixed(1)}`}
                step={0.1}
                marks={[
                  { value: dataCaratWeightStart, label: `${dataCaratWeightStart}` },
                  { value: dataCaratWeightEnd, label: `${dataCaratWeightEnd}` }
                ]}
                sx={styleSlider}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} sm={12} md={12} lg={3} sx={styleSliderContainer}>
          <Grid>
            <h3 style={{
              marginRight: '30px'
            }}>
              Color
            </h3>
          </Grid>
          <Grid>
            <Box sx={{ padding: 0 }}>
              <Slider
                min={0}
                max={dataColors.length - 1}
                value={valueColor}
                onChange={(_, newValue) => handleChangeColor(newValue)} // Ignore the event parameter
                aria-labelledby="range-slider"
                getAriaValueText={(value) => dataColors[value]}
                valueLabelFormat={(value) => dataColors[value]}
                step={1}
                marks={valueColor.map(index => ({ value: index, label: dataColors[index] }))}
                sx={styleSlider}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} sm={12} md={12} lg={3} sx={styleSliderContainer}>
          <Grid>
            <h3 style={{
              marginRight: '30px'
            }}>Clarity</h3>
          </Grid>
          <Grid>
            <Box sx={{ padding: 0 }}>
              <Slider
                min={0}
                max={dataClarity.length - 1}
                value={valueClarity}
                onChange={(_, newValue) => handleChangeClarity(newValue)} // Ignore the event parameter
                aria-labelledby="range-slider"
                getAriaValueText={(value) => dataClarity[value]}
                valueLabelFormat={(value) => dataClarity[value]}
                step={1}
                marks={valueClarity.map(index => ({ value: index, label: dataClarity[index] }))}
                sx={styleSlider}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} sm={12} md={12} lg={3} sx={styleSliderContainer}>
          <Grid>
            <h3 style={{
              marginRight: '30px'
            }}>Cut</h3>
          </Grid>
          <Grid>
            <Box sx={{
              padding: 0
            }}>
              <Slider
                min={0}
                max={dataCut.length - 1}
                value={valueCut}
                onChange={(_, newValue) => handleChangeCut(newValue)} // Ignore the event parameter
                aria-labelledby="range-slider"
                getAriaValueText={(value) => dataCut[value]}
                valueLabelFormat={(value) => dataCut[value]}
                step={1}
                marks={valueCut.map(index => ({ value: index, label: dataCut[index] }))}
                sx={styleSlider}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{
        ...styleSliderContainer,
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      }}>
        <Box sx={{
        }}>
          <Grid container columnSpacing={9} rowSpacing={6} sx={{ width: '80vw' }} columns={{ xs: 12, sm: 8, md: 12 }}>
            {data ? data.map((item, index) =>
              item.isDeleted ? null : (
                <Grid item xs={12} sm={4} md={3} key={index} sx={{
                  width: '15vw',
                }} >

                  <Card sx={{
                    height: '100%',
                    '&:hover': {
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                      '&:hover': {
                        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.8)',
                      }
                    }
                  }}>
                    <Link
                      to={`/diamond/detail/${item.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        height: '100%',
                      }}
                    >
                      <CardContent sx={{
                        height: '85%',
                      }}>
                        {item.images && item.images[0] && item.images[0].urlPath ? (
                          <>
                            <CardMedia
                              component="img"
                              image={item.images[0].urlPath}
                              alt="Paella dish"
                              sx={{
                                width: '100%',
                                borderRadius: '20px',
                                height: 'auto',
                                objectFit: 'cover'
                              }}
                            />
                          </>

                        ) : null}
                        <p style={{
                          textAlign: 'center',
                          fontSize: '20px',
                        }}>
                          {item.name}
                        </p>
                        <p
                          style={{
                            textAlign: 'center',
                            fontSize: '20px',
                          }}>
                          Price: {item.price.toLocaleString()}$
                        </p>
                      </CardContent>
                    </Link>
                    {token ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        width: '100%',
                        height: '15%',
                      }}>
                        <Button fullWidth onClick={() => addToCart(item)} sx={{
                          color: 'black',
                          display: 'flex',
                          justifyContent: 'center',
                          height: '50px',
                          backgroundColor: '#ad2a36',
                          '&:hover': {
                            backgroundColor: '#ad2a36',
                          }
                        }} size='large'
                          variant='contained'
                        >
                          <ShoppingCartIcon fontSize='large' sx={{
                            height: '50px',
                            color: '#fff',
                            fontSize: '70px',
                          }}></ShoppingCartIcon>
                        </Button>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        width: '100%',
                        height: '15%',
                      }}>
                        <Button fullWidth onClick={() => navigate('/login')} sx={{
                          color: 'black',
                          display: 'flex',
                          justifyContent: 'center',
                          height: '50px',
                          backgroundColor: '#ad2a36',
                          '&:hover': {
                            backgroundColor: '#ad2a36',
                          }
                        }} size='large'
                          variant='contained'
                        >
                          <ShoppingCartIcon fontSize='large' sx={{
                            height: '50px',
                            color: '#fff',
                            fontSize: '70px',
                          }}></ShoppingCartIcon>
                        </Button>
                      </div>
                    )}
                  </Card>
                </Grid>
              )
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
          </Grid>
        </Box>
      </Container><br />
      <Stack sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} size="large" />
      </Stack>
    </div >
  )
}