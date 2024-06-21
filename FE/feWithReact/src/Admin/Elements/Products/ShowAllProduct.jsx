import { Box, Grid, Container } from '@mui/material'
import { Outlet, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Stack, Pagination, Button } from '@mui/material'
import { Table, TableBody, TableContainer, TableHead, ImageList, TableRow, ImageListItem, styled } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ButtonDeleteProduct from './ButtonDeleteProduct'
import { useNavigate } from 'react-router-dom'
import ShowDetails from './ShowDetails'
import CreateProduct from './CreateProduct'
import "swiffy-slider/css"
import UpdateProduct from './UpdateProduct';
export default function ShowAllProduct() {
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(4)
  const [OrderByDesc, setOrderByDesc] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const navigate = useNavigate()
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
    }
    ReadData()
  }, [triggerRead])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#252f38',
      color: '#dbd1d0',
      fontWeight: 'bold',
      fontSize: 16,
      border: '1px solid rgba(0,0,0,0.1)',
      width: 200,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: '1px solid rgba(0,0,0,0.1)',
    },
  }))

  return (
    <div style={{
      justifyContent: 'flex-end'
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10vw',
        marginTop: '2vh'
      }}>
        <CreateProduct></CreateProduct>

        <Button
          variant="contained"
          type="button"
          size="large"
          onClick={() => setTriggerRead(prev => !prev)}
          sx={{
            backgroundColor: '#4d5b6b',
            color: '#f2f2f2',
            marginLeft: '1vw',
            '&:hover': {
              backgroundColor: '#4d5b6b',
              color: '#f2f2f2',
            }
          }}>
          REFRESH
        </Button>
      </div>

      <Container sx={{
        display: 'flex',
        alignItems: 'center',
      }}>

        <Box>
          <TableContainer>
            <Table sx={{
              border: '1px solid rgba(0,0,0,0.1)',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Deleted</StyledTableCell>
                  <StyledTableCell>Update</StyledTableCell>
                  <StyledTableCell>Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.map((item, index) => (
                  <>
                    <TableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>
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
                      </StyledTableCell>
                      <StyledTableCell>{item.name}</StyledTableCell>
                      <StyledTableCell><ButtonDeleteProduct id={item.id} isDeleted={item.isDeleted} /></StyledTableCell>
                      <StyledTableCell><UpdateProduct item={item} image={item.images}></UpdateProduct></StyledTableCell>
                      <StyledTableCell><ShowDetails id={item.id}></ShowDetails></StyledTableCell>
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