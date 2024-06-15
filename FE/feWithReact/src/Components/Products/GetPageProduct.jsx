import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState, setParams } from 'react'
import { Stack, Pagination, TextField } from '@mui/material'
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
      OrderByDesc: OrderByDesc
    },
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
          <Grid container columnSpacing={3} sx={{ width: '80vw', }}>
            {data && data.map((item, index) => (

              <Grid item xs={3}>
                <Card div key={index}
                  sx={{
                    height: 'auto',
                    margin: '50px 50px 0 50px',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: '10px',
                    }
                  }}>
                  <>
                    {/* to={`/product/${item.id}`} */}
                    <CardContent >
                      {item.images[0] && (<img src={item.images[0].urlPath} alt="img" style={{
                        width: '100%',
                        borderRadius: '10px',
                      }} />)}

                      <Container sx={{
                        textAlign: 'center',
                        padding: '10px',
                        width: '100%',
                      }}>
                        <h2>{item.name}</h2>
                        <p>{item.category.name}</p>
                        <p>Stock: {item.quantity}</p>
                      </Container>
                    </CardContent>
                  </>
                </Card>
              </Grid>
            ))
            }
          </Grid>
        </Box>
      </Container>
      <Stack sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} />
      </Stack>
    </div>
  )
}