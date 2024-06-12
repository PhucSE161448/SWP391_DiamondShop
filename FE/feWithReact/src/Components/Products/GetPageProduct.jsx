import { Box, Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react'

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
      fetch(`https://localhost:7122/api/Product/GetPagedProducts?${queryString.toString()}`)
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
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {/* <button onClick={() => setTriggerRead(prev => !prev)}>
        Hello {console.log(data)}
      </button> */}
      <Box>
        <Grid container rowSpacing={1}>
          {data && data.map((item, index) => (
            <Grid item xs={3}>
              <Card div key={index}
                sx={{
                  width: '50%',
                  margin: '100px'
                }}>
                <CardContent>
                  <p>{item.name}</p>
                  <p>Category: {item.category.name}</p>
                  <p>Stock: {item.quantity}</p>
                </CardContent>
              </Card>
            </Grid>
          ))
          }
        </Grid>
      </Box>
    </div>
  )
}