import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function GetPageProduct() {
  const params = {
    queryDTO: {
      PageNumber: 1,
      PageSize: 12,
      OrderByDesc: false
    },
  }
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)

  useEffect(() => {
    function ReadData() {
      let queryString = new URLSearchParams()
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        queryString.append(`queryDTO.${key}`, value)
      })
      fetch(`https://localhost:7054/api/Product/GetPagedProducts?${queryString.toString()}`)
        .then(response => response.json())
        // .then(response => response.json())
        .then(data => {
          // Xử lý kết quả trả về ở đây
          setData(data.items)

        })
        .catch(error => {
          // Xử lý lỗi ở đây
          console.error(error)
        })
    }
    ReadData()
  }, [triggerRead])

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

    }}>
      {/* <button onClick={() => setTriggerRead(prev => !prev)}>
        Hello {console.log(data)}
      </button> */}
      <Box sx={{
        backgroundColor: 'rgba(0,0,0,0.1)',

      }}>
        <Grid container columnSpacing={3} sx={{ width: '80vw', }}>
          {data && data.map((item, index) => (

            <Grid item xs={3}>
              <Card div key={index}
                sx={{
                  margin: '50px 50px 0 50px',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                  }
                }}>
                <>
                  {/* to={`/product/${item.id}`} */}
                  <CardContent >
                    {console.log(item.images)}
                    <img src={item.images[0].urlPath} alt="img" style={{
                      width: '100%',
                      borderRadius: '10px',
                    }} />
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
  )
}