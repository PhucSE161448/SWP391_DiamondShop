import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import {
  Stack, Pagination, TextField, CardMedia, FormControl, InputLabel,
  Select, MenuItem, OutlinedInput, Checkbox, ListItemText, Button
} from '@mui/material'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { createApi } from '../../Auth/AuthFunction'
export default function GetPageProduct() {
  const { PageNumberFromURL } = useParams()
  const navigate = useNavigate()
  const [PageNumber, setPageNumber] = useState(PageNumberFromURL && parseInt(PageNumberFromURL))
  const [PageSize, setPageSize] = useState(12)
  const [OrderBy, setOrderBy] = useState({ OrderByDesc: null, SortBy: '' })
  const [StartPrice, setStartPrice] = useState(null)
  const [EndPrice, setEndPrice] = useState(null)
  const [Price, setPrice] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
  const [CategoryIds, setCategoryIds] = useState([])
  const [Category, setCategory] = useState(null)
  const [CollectionIds, setCollectionId] = useState([])
  const [dataCollection, setDataCollection] = useState(null)
  const [DiamondIds, setDiamondId] = useState([])
  const [dataDiamond, setDataDiamond] = useState(null)
  const [nameProduct, setNameProduct] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(StartPrice != null && { StartPrice: StartPrice }),
      ...(EndPrice != null && { EndPrice: EndPrice }),
      ...(OrderBy.OrderByDesc !== null && { OrderByDesc: OrderBy.OrderByDesc }),
      ...(OrderBy.SortBy !== '' && { SortBy: OrderBy.SortBy }),
      ...(CategoryIds !== null && { CategoryIds: CategoryIds }),
      ...(CollectionIds !== null && { CollectionIds: CollectionIds }),
      ...(DiamondIds !== null && { DiamondIds: DiamondIds }),
      ...(nameProduct !== null && { Name: nameProduct }),
    },
  }

  const handleChangeOrder = (value, type) => {
    if (value === null) {
      setOrderBy({ OrderByDesc: null, SortBy: '' })
    } else {
      setOrderBy({ OrderByDesc: value, SortBy: type })
      setTriggerRead(prev => !prev)
    }
  }

  const handlePageChange = (event, value) => {
    setPageNumber(value)
    navigate(`/product/${value}`)
    setTriggerRead(prev => !prev)
  }

  const handleChangeCategory = (value) => {
    setCategoryIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setTriggerRead(prev => !prev)
  }

  const handleChangeCollection = (value) => {
    setCollectionId(
      typeof value === 'string' ? value.split(',') : value,
    )
    setTriggerRead(prev => !prev)
  }

  const handleChangeDiamondId = (value) => {
    setDiamondId(
      typeof value === 'string' ? value.split(',') : value,
    )
    setTriggerRead(prev => !prev)
  }

  const handleChangeNameProduct = (value) => {
    setNameProduct(value)
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

  const debouncedHandleChangeNameProduct = debounce(handleChangeNameProduct, 500)
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

  const ITEM_HEIGHT = 120
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }
  useEffect(() => {
    // Define the Read function inside useEffect or make sure it's defined outside and doesn't change
    function Read() {
      const url = createApi('Category/GetAllCategories')
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*'
        },
      })
        .then(response => response.json())
        .then(responseData => {
          setCategory(responseData)
        })
        .catch((error) => console.error('Error:', error))
    }
    Read()
  }, [])
  useEffect(() => {
    const url = createApi('Diamond/GetPagedDiamonds?QueryDTO.PageSize=10000')
    function getDiamondData() {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDataDiamond(data.items)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getDiamondData()
  }, [])

  useEffect(() => {
    const url = createApi('Collection/GetAllCollections')
    function getCollectionData() {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDataCollection(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getCollectionData()
  }, [])

  useEffect(() => {
    function ReadData() {
      let queryString = new URLSearchParams();
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        if (key === 'CategoryIds' && Array.isArray(value)) { // Check if value is an array
          value.forEach((id) => { // Iterate over the array
            queryString.append(`${key}`, id);
          })
        } else if (key === 'CollectionIds' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id);
          })
        } else if (key === 'DiamondIds' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id);
          })
        } else if ((key === 'StartPrice' || key === 'EndPrice') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else if ((key === 'Name') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else {
          queryString.append(`queryDTO.${key}`, value);
        }
      })
      const url = createApi(`Product/GetPagedProducts?${queryString.toString()}`)
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
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
    }}>
      <Container>
        <Grid container spacing={2} sx={{
          padding: '20px',
          margin: '0px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>
                Order by price
              </InputLabel>
              <Select
                label="Order by price"
                MenuProps={MenuProps}
                value={OrderBy.OrderByDesc}
                onChange={(e) => handleChangeOrder(e.target.value, 'price')}
              >
                <MenuItem value={false}>Ascending</MenuItem>
                <MenuItem value={true}>Descending</MenuItem>
                <MenuItem value={null}>Default</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>
                Category
              </InputLabel>
              <Select
                label="Category"
                MenuProps={MenuProps}
                multiple
                value={CategoryIds}
                onChange={(e) => handleChangeCategory(e.target.value)}
                input={<OutlinedInput label="Category" />}
                renderValue={(selected) =>
                  Category.filter(cat => selected.includes(cat.id)).map(cat => cat.name).join(', ')
                }
              >
                {Category && Category.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    <Checkbox checked={CategoryIds.indexOf(item.id) > -1} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>
                Collection
              </InputLabel>
              <Select
                label="Collection"
                MenuProps={MenuProps}
                multiple
                value={CollectionIds}
                onChange={(e) => handleChangeCollection(e.target.value)}
                input={<OutlinedInput label="Collection" />}
                renderValue={(selected) =>
                  dataCollection.filter(cat => selected.includes(cat.id)).map(cat => cat.name).join(', ')
                }
              >
                {dataCollection && dataCollection.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    <Checkbox checked={CollectionIds.indexOf(item.id) > -1} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>
                Diamond
              </InputLabel>
              <Select
                label="Diamond"
                MenuProps={MenuProps}
                multiple
                value={DiamondIds}
                onChange={(e) => handleChangeDiamondId(e.target.value)}
                input={<OutlinedInput label="Diamond" />}
                renderValue={(selected) =>
                  dataDiamond.filter(cat => selected.includes(cat.id)).map(cat => cat.name).join(', ')
                }
              >
                {dataDiamond && dataDiamond.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    <Checkbox checked={DiamondIds.indexOf(item.id) > -1} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
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
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <TextField
                label="Search"
                variant="outlined"
                onChange={(e) => debouncedHandleChangeNameProduct(e.target.value)}
                sx={{
                  width: '100%',
                }}
              >
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      }}>
        <Box>
          <Grid container columnSpacing={9} rowSpacing={6} sx={{ width: '80vw' }} columns={{ xs: 12, sm: 8, md: 12 }}>
            {data && data.map((item, index) =>
              item.isDeleted ? null : (
                <Grid item xs={12} sm={4} md={3} key={index} sx={{
                  width: '15vw',
                }} >
                  <Card sx={{
                    '&:hover': {
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                      '&:hover': {
                        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.8)',
                        transform: 'scale(1.2)',
                      }
                    }
                  }}>
                    <Link
                      to={`/product/detail/${item.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <CardContent >
                        {item.images && item.images[0] && item.images[0].urlPath ? (
                          <>
                            <CardMedia
                              component="img"
                              image={item.images[0].urlPath}
                              alt="Paella dish"
                              sx={{
                                width: '100%',
                                borderRadius: '20px',
                                height: '400px',
                                width: '400px',
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
                        <h3
                          style={{
                            textAlign: 'center',
                          }}>
                          Price: {item.productSizes[0]?.price.toLocaleString()}$
                        </h3>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              )
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