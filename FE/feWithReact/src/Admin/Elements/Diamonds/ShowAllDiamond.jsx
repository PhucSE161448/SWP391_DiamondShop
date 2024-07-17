import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Pagination, Button } from '@mui/material'
import { Table, TableBody, TableContainer, TableHead, ImageList, TableRow, ImageListItem, styled } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import "swiffy-slider/css"
import ButtonDeleteDiamond from './ButtonDeleteDiamond'
import CreateDiamond from './CreateDiamond'
import ShowDetailsDiamond from './ShowDetails'
import UpdateDiamond from './UpdateDiamond'
import { createApi } from '../../../Auth/AuthFunction'

export default function ShowAllDiamond() {
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(4)
  const [OrderByDesc, setOrderByDesc] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  const rowsHeader = ["#", "Image", "Origin", "Color", "Carat Weight",
    "Clarity", "Cut", "Price", "Quantity", "Status",
  ]
  useEffect(() => {
    if (role !== '1') {
      navigate('/admin')
    }
  })
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
      const url = createApi(`Diamond/GetPagedDiamonds?${queryString.toString()}`)
      fetch(url)
        .then(response => response.json())
        // .then(response => response.json())
        .then(data => {
          setData(data.items)
          setTotalPage(Math.ceil(data.totalItemsCount / PageSize))
        })
    }
    ReadData()
  }, [triggerRead])

  return (
    <>
      <div className='contentAdminContainer'>
        <div className='CRUDContainer '>
          <div className='titleOfFormContainer'>
            <h2>Diamond</h2>
          </div>
          <div className='buttonContainer'>
            <div className='formCRUDContainer'>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <CreateDiamond onDiamondCreated={() => setTriggerRead(prev => !prev)}></CreateDiamond>
              </div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {rowsHeader.map((item, index) => (
                        <TableCell sx={{
                          fontWeight: 'bold',
                          fontSize: '20px'
                        }} key={index}>{item}</TableCell>
                      ))}
                      <TableCell sx={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                      }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && data.map((item, index) => (
                      <>
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
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
                          <TableCell>{item.origin}</TableCell>
                          <TableCell>{item.color}</TableCell>
                          <TableCell>{item.caratWeight}</TableCell>
                          <TableCell>{item.clarity}</TableCell>
                          <TableCell>{item.cut}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell key={`delete-${item.id}`}>
                            <ButtonDeleteDiamond key={item.id} id={item.id} isDeleted={item.isDeleted} onDiamondDeleted={() => setTriggerRead(prev => !prev)} />
                          </TableCell>
                          <TableCell>
                            <UpdateDiamond item={item} image={item.images} onDiamondUpdated={() => setTriggerRead(prev => !prev)}></UpdateDiamond>
                            <ShowDetailsDiamond id={item.id}></ShowDetailsDiamond>
                          </TableCell>

                        </TableRow>
                      </>
                    ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} />
              </Stack>
            </div >
          </div>
        </div>
      </div>

    </>

  )
}