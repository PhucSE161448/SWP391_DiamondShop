import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState, setParams } from 'react'
import { Stack, Pagination, TextField } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, ImageList, TableRow, ImageListItem } from '@mui/material'
import "swiffy-slider/css"
export default function ShowAllProduct() {
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(4)
  const [OrderByDesc, setOrderByDesc] = useState(null)
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
      justifyContent: 'flex-end'
    }}>

      <Container sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Product part</TableCell>
                  <TableCell>Product size</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Warranty Documents</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.map((item, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.category.name}</TableCell>
                      <TableCell>{item.gender ? 'Male' : 'Female'}</TableCell>

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
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.productPart}</TableCell>
                      <TableCell>{item.productSize}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <TableRow>
                          <TableCell> period: {item.warrantyDocuments.period}</TableCell>
                          <TableCell> Term: {item.warrantyDocuments.termsAndConditions}</TableCell>
                        </TableRow>
                      </TableCell>
                    </TableRow>

                  </>
                ))
                }
              </TableBody>

            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Stack sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} />
      </Stack>
    </div >
  )
}