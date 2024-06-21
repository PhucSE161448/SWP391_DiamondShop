import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState, setParams } from 'react'
import { Stack, Pagination, Button } from '@mui/material'
import { Table, TableBody, TableContainer, TableHead, ImageList, TableRow, ImageListItem, styled } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import "swiffy-slider/css"
import ButtonDeleteDiamond from './ButtonDeleteDiamond'
import CreateDiamond from './CreateDiamond'
import ShowDetailsDiamond from './ShowDetails'
import UpdateDiamond from './UpdateDiamond'

export default function ShowAllDiamond() {
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
          fetch(`https://localhost:7122/api/Diamond/GetPagedDiamonds?${queryString.toString()}`)
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
          <CreateDiamond></CreateDiamond>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10vw',
            marginTop: '2vh'
          }}>
            <Button variant="contained" type="button" size="large" onClick={() => setTriggerRead(prev => !prev)}>
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
                      <StyledTableCell>Origin</StyledTableCell>
                      <StyledTableCell>Color</StyledTableCell>
                      <StyledTableCell>Carat Weight</StyledTableCell>
                      <StyledTableCell>Clarity</StyledTableCell>
                      <StyledTableCell>Cut</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Quantity</StyledTableCell>
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
                          <StyledTableCell>{item.origin}</StyledTableCell>
                          <StyledTableCell>{item.color}</StyledTableCell>
                          <StyledTableCell>{item.caratWeight}</StyledTableCell>
                          <StyledTableCell>{item.clarity}</StyledTableCell>
                          <StyledTableCell>{item.cut}</StyledTableCell>
                          <StyledTableCell>{item.price}</StyledTableCell>
                          <StyledTableCell>{item.quantity}</StyledTableCell>
                          <StyledTableCell><ButtonDeleteDiamond id={item.id} isDeleted={item.isDeleted} /></StyledTableCell>
                          <StyledTableCell><UpdateDiamond item={item} image={item.images}></UpdateDiamond></StyledTableCell>
                          <StyledTableCell><ShowDetailsDiamond id={item.id}></ShowDetailsDiamond></StyledTableCell>
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