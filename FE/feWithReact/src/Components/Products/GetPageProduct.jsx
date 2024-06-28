import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import {
  Stack, Pagination, TextField, CardMedia, FormControl, InputLabel,
  Select, MenuItem, OutlinedInput, Checkbox, ListItemText,
} from '@mui/material'
import { Slider } from 'antd'
import { Link } from 'react-router-dom'
export default function GetPageProduct() {
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(12)
  const [OrderByDesc, setOrderByDesc] = useState(false)
  const [StartPrice, setStartPrice] = useState(null)
  const [EndPrice, setEndPrice] = useState(null)
  const [Price, setPrice] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
  const [CategoryIds, setCategoryIds] = useState([])
  const [Category, setCategory] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(StartPrice != null && { StartPrice: StartPrice }),
      ...(EndPrice != null && { EndPrice: EndPrice }),
      ...(OrderByDesc !== null && { OrderByDesc: OrderByDesc }),
      ...(CategoryIds !== null && { CategoryIds: CategoryIds }),
    },
  }

  const handlePageChange = (event, value) => {
    setPageNumber(value)
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
      const url = 'https://localhost:7122/api/Category/GetAllCategories';
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
    function ReadData() {
      let queryString = new URLSearchParams();
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        if (key === 'CategoryIds' && Array.isArray(value)) { // Check if value is an array
          value.forEach((id) => { // Iterate over the array
            queryString.append(`${key}`, id);
          })
        } else if ((key === 'StartPrice' || key === 'EndPrice') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else {
          queryString.append(`queryDTO.${key}`, value);
        }
      });
      console.log(queryString.toString())
      fetch(`https://localhost:7122/api/Product/GetPagedProducts?${queryString.toString()}`)
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

  const handleChangePageSize = (value) => {
    setPageSize(value)
    setTriggerRead(prev => !prev)
  }

  const handleChangeOrder = (value) => {
    setOrderByDesc(value)
    setTriggerRead(prev => !prev)
  }

  const handleChangeCategory = (value) => {
    setCategoryIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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

  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.1)',
    }}>
      <div className='row' style={{
        display: 'flex',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px',
      }}>
        <div className='col-1'>
          <FormControl fullWidth>
            <InputLabel>Products per page</InputLabel>
            <Select
              label="Products per page"
              MenuProps={MenuProps}
              value={PageSize}
              onChange={(e) => handleChangePageSize(e.target.value)}
            >
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={32}>32</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='col-1'>
          <FormControl fullWidth>
            <InputLabel>
              Order by price
            </InputLabel>
            <Select
              label="Order by price"
              MenuProps={MenuProps}
              value={OrderByDesc}
              onChange={(e) => handleChangeOrder(e.target.value)}
            >
              <MenuItem value={false}>Ascending</MenuItem>
              <MenuItem value={true}>Descending</MenuItem>
              <MenuItem value={null}>Default</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='col-3'>
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
        </div>
        <div className='col-2'>
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
        </div>
      </div>

      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{
        }}>
          <Grid container columnSpacing={9} rowSpacing={6} sx={{ width: '80vw' }} columns={{ xs: 12, sm: 8, md: 12 }}>
            {data && data.map((item, index) =>
              item.isDeleted ? null : (
                <Grid item xs={12} sm={4} md={3} key={index} sx={{
                  width: '15vw',
                }} >
                  <Link
                    to={`/ring/detail/${item.id}`}
                  >
                    <Card>
                      <CardContent>
                        {item.images && item.images[0] && item.images[0].urlPath ? (
                          <>
                            <CardMedia
                              component="img"
                              image={item.images[0].urlPath}
                              alt="Paella dish"
                              sx={{
                                width: '100%',
                              }}
                            />
                          </>

                        ) : null}
                        <p style={{
                          textAlign: 'center',
                          fontSize: '1vw',
                        }}>
                          {item.name}
                        </p>
                        <p
                          style={{
                            textAlign: 'center',
                            fontSize: '1vw',
                          }}>
                          Price: {item.productSizes[0]?.price.toLocaleString()}$
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
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
    </div>
  )
}