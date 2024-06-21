import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState, setParams } from 'react'
import { Stack, Pagination, TextField, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
export default function GetPageProduct() {
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(12)
  const [OrderByDesc, setOrderByDesc] = useState(false)
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(OrderByDesc !== null && { OrderByDesc: OrderByDesc }),
    },
  }

  function calculatePrice(price1, price2) {
    return price1 + price2
  }


  const handlePageChange = (event, value) => {
    setPageNumber(value)
    setTriggerRead(prev => !prev)
  }

  useEffect(() => {
    function ReadData() {
      let queryString = new URLSearchParams()
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        queryString.append(`queryDTO.${key}`, value)
      })
      fetch(`https://localhost:7122/api/Product/GetPagedProducts?${queryString.toString()}`)
        .then(response => response.json())
        // .then(response => response.json())
        .then(data => {
          setData(data.items)
          setTotalPage(Math.ceil(data.totalItemsCount / PageSize))
          console.log(data.items)
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
      backgroundColor: 'rgba(0,0,0,0.1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px 20px 0 0',
      }}>
        <TextField>

        </TextField>
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
                  <Link to={`/ring/detail/${item.id}`}>
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
                          {item.productParts && item.productParts.length > 1
                            && calculatePrice(item.productParts[0].diamond?.price, item.productParts[1].diamond?.price)}
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