import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import {
  Stack, Pagination, CardMedia, FormControl, InputLabel,
  Select, MenuItem,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { createApi } from '../../Auth/AuthFunction'
export default function GetPageProduct() {
  const { id } = useParams()
  const [CategoryIds, setCategoryIds] = useState([id])
  const navigate = useNavigate()
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(12)
  const [OrderBy, setOrderBy] = useState({ OrderByDesc: null, SortBy: '' })
  const [StartPrice, setStartPrice] = useState(null)
  const [EndPrice, setEndPrice] = useState(null)
  const [Price, setPrice] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
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
    setCategoryIds([id])
  }, [id])

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
  }, [triggerRead, CategoryIds])



  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
    }}>
      <Grid container spacing={2} sx={{
        padding: '20px',
        margin: '0px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Grid item xs={12} sm={6} md={3}>
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
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
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
                Array.from({ length: (7000 - 1000) / 500 }, (_, index) => {
                  const start = 1000 + (500 * index);
                  const end = start + 500;
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
      {data ? (
        <>
          <Container sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Box>
              <Grid container columnSpacing={9} rowSpacing={6} sx={{ width: '80vw' }} columns={{ xs: 12, sm: 8, md: 12 }}>
                {data && data.map((item, index) =>
                  item.isDeleted ? null : (
                    <Grid item xs={12} sm={4} md={3} key={index} sx={{
                      width: '15vw',
                    }} >
                      <Link
                        to={`/product/detail/${item.id}`}
                        style={{ textDecoration: 'none' }}
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
                                    borderRadius: '20px',
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
        </>
      ) :
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          width: '100%',
        }}>
          <CircularProgress />
        </div>
      }
    </div>
  )
}