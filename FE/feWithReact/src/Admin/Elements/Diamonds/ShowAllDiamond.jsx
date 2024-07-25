import React, { useEffect, useState } from 'react'
import { Stack, Pagination, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { Table, TableBody, TableContainer, TableHead, ImageList, TableRow, ImageListItem, CircularProgress, Box, Slider } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import ButtonDeleteDiamond from './ButtonDeleteDiamond'
import CreateDiamond from './CreateDiamond'
import ShowDetailsDiamond from './ShowDetails'
import UpdateDiamond from './UpdateDiamond'
import { createApi } from '../../../Auth/AuthFunction'
import { useNavigate, useSearchParams } from 'react-router-dom'
export default function ShowAllDiamond() {
  const [searchParams] = useSearchParams()
  const [PageNumber, setPageNumber] = useState(searchParams.get('pageNumber'))
  const [PageSize, setPageSize] = useState(4)
  const [name, setName] = useState(searchParams.get('name'))
  const [StartPrice, setStartPrice] = useState(null)
  const [EndPrice, setEndPrice] = useState(null)
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
  const [order, setOrder] = useState({ OrderByDesc: searchParams.get('OrderBy'), SortBy: '' })
  const [Price, setPrice] = useState(null)
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  const rowsHeader = ["Image", "Origin", "Color", "Carat Weight",
    "Clarity", "Cut", "Price", "Quantity", "Status",
  ]
  useEffect(() => {
    if (role !== '1' && role !== '2') {
      navigate('/admin')
    }
  })

  const handleChangeOrder = (value, type) => {
    setData(null)
    navigate(`/admin/diamond?pageNumber=1&name=${name}&OrderBy=${value}`)
    if (value === null) {
      setOrder({ OrderByDesc: null, SortBy: '' })
    } else {
      setOrder({ OrderByDesc: value, SortBy: type })
      setTriggerRead(prev => !prev)
    }
  }

  const handleChangeName = (newValue) => {
    navigate(`/admin/diamond?pageNumber=1&name=${newValue}`)
    setData(null)
    setName(newValue)
    console.log(newValue)
    setTriggerRead((prev) => !prev)
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

  const debouncedHandleChangeName = debounce(handleChangeName, 500)

  const handleChangeColor = debounce((newValue) => {
    setValueColor(newValue)
    setData(null)
    setTriggerRead(prev => !prev);
  }, 500)

  const handleChangeClarity = debounce((newValue) => {
    setValueClarity(newValue)
    setData(null)
    setTriggerRead(prev => !prev)
  }, 500)

  const handleChangeCut = debounce((newValue) => {
    setValueCut(newValue)
    setData(null)
    setTriggerRead(prev => !prev)
  }, 500)

  const handleChangeCaratWeight = debounce((newValue) => {
    setData(null)
    setDataCaratWeightStart(Number(newValue[0]).toFixed(1))
    setDataCaratWeightEnd(Number(newValue[1]).toFixed(1))
    setTriggerRead(prev => !prev);
  }, 500)

  const selectedColor = dataColors.slice(valueColor[0], valueColor[1] + 1)
  const selectedClarities = dataClarity.slice(valueClarity[0], valueClarity[1] + 1)
  const selectedCut = dataCut.slice(valueCut[0], valueCut[1] + 1)

  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(name !== null && { Name: name }),
      ...(StartPrice != null && { StartPrice: StartPrice }),
      ...(EndPrice != null && { EndPrice: EndPrice }),
      ...(order.OrderByDesc !== null && { OrderByDesc: order.OrderByDesc }),
      ...(order.SortBy !== null && { SortBy: order.SortBy }),
      ...(selectedColor !== null && { Colors: selectedColor }),
      ...(selectedClarities !== null && { Clarities: selectedClarities }),
      ...(valueCut !== null && { Cuts: selectedCut }),
      ...(dataCaratWeightStart !== null && { StartCaratWeight: dataCaratWeightStart }),
      ...(dataCaratWeightEnd !== null && { EndCaratWeight: dataCaratWeightEnd }),
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

  const handlePageChange = (event, value) => {
    navigate(`/admin/diamond?pageNumber=${value}&name=${name}&OrderBy=${order.OrderByDesc}`)
    setPageNumber(value)
    setData(null)
    setTriggerRead(prev => !prev)
  }

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

  useEffect(() => {
    function ReadData() {
      let queryString = new URLSearchParams()
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        if (key === 'Colors' && Array.isArray(value)) { // Check if value is an array
          value.forEach((id) => { // Iterate over the array
            queryString.append(`${key}`, id);
          })
        } else if (key === 'Clarities' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id);
          })
        } else if (key === 'Cuts' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id);
          })
        } else if ((key === 'StartPrice' || key === 'EndPrice') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else if ((key === 'StartCaratWeight' || key === 'EndCaratWeight') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else if (key === 'Name') {
          queryString.append(`${key}`, value);
        } else {
          queryString.append(`queryDTO.${key}`, value);
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
    ReadData()
  }, [triggerRead])

  return (
    <>
      <div className='contentAdminContainer'>
        <div className='CRUDContainer '>
          <div className='titleOfFormContainer'>
            <h2>Diamond</h2>
          </div>
          <div>
            <Grid container spacing={2} sx={{
              paddingTop: '20px',
              paddingBottom: '20px',
              margin: '0px',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}>
              <Grid xs={3} sm={3} md={3} sx={{
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
              <Grid xs={3} sm={3} md={3} sx={{
                margin: '20px',
              }}>
                <FormControl fullWidth>
                  <TextField
                    label="Search by name"
                    onChange={(e) => debouncedHandleChangeName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={3} sm={3} md={3} sx={{
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
            </Grid>
          </div>
          <div>
            <Grid container spacing={2} sx={{
              padding: '20px 0 20px 0',
              margin: '0px',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <Grid container spacing={2} item xs={3} sm={3} md={3} lg={3} sx={styleSliderContainer}>
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
              <Grid container spacing={2} item xs={3} sm={3} md={3} lg={3} sx={styleSliderContainer}>
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
              <Grid container spacing={2} item xs={3} sm={3} md={3} lg={3} sx={styleSliderContainer}>
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
              <Grid container spacing={2} item xs={3} sm={3} md={3} lg={3} sx={styleSliderContainer}>
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
          </div>
        </div>
      </div>
      {data ? (
        <div className='contentAdminContainer'>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <CreateDiamond onDiamondCreated={() => setTriggerRead(prev => !prev)}></CreateDiamond>
          </div>
          <div className='CRUDContainer '>
            <div className='buttonContainer'>
              <div className='formCRUDContainer'>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {rowsHeader.map((item, index) => (
                          <TableCell sx={{
                            fontWeight: 'bold',
                            fontSize: '20px'
                          }} key={index}>{item}</TableCell>
                        ))}
                        <TableCell sx={{
                          fontWeight: 'bold',
                          fontSize: '20px',
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data && data.map((item, index) => (
                        <>
                          <TableRow key={index}>
                            <TableCell>
                              <ImageList sx={{ width: 200, height: 150 }} cols={1} rowHeight={150}>
                                {item.images && item.images.map((image, index) => (
                                  <ImageListItem >
                                    <img key={index} src={image.urlPath} alt="img" style={{
                                      width: '150px',
                                      padding: '10px',
                                      borderRadius: '10px',
                                    }} />
                                  </ImageListItem>

                                ))}
                              </ImageList>
                            </TableCell>
                            <TableCell>{item.origin}</TableCell>
                            <TableCell>{item.color}</TableCell>
                            <TableCell>{item.caratWeight}</TableCell>
                            <TableCell>{item.clarity}</TableCell>
                            <TableCell>{item.cut}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell key={`delete-${item.id}`}>
                              <ButtonDeleteDiamond key={item.id} id={item.id} isDeleted={item.isDeleted} onDiamondDeleted={() => setTriggerRead(prev => !prev)} />
                            </TableCell>
                            <TableCell>
                              <UpdateDiamond item={item} image={item.images} onDiamondUpdated={() => setTriggerRead(prev => !prev)}></UpdateDiamond>
                              <ShowDetailsDiamond id={item.id}></ShowDetailsDiamond>
                            </TableCell>

                          </TableRow>
                        </>
                      ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} />
                </Stack>
              </div >
            </div>
          </div>
        </div>
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
    </>

  )
}