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
import { createApi } from '../../../Auth/AuthFunction';
export default function ShowAllProduct() {
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(4)
  const [OrderByDesc, setOrderByDesc] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

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
      const url = createApi(`Product/GetPagedProducts?${queryString.toString()}`)
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setData(data.items)
          setTotalPage(Math.ceil(data.totalItemsCount / PageSize))
        })
    }
    ReadData()
  }, [triggerRead])

  const tableHead = ['#', 'Image', 'Name', 'Status']
  return (
    <>
      <div className='contentAdminContainer'>
        <div className='CRUDContainer '>
          <div className='titleOfFormContainer'>
            <h2>Product</h2>
          </div>
          <div className='buttonContainer'>
            <div className='formCRUDContainer'>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <CreateProduct onProductCreated={() => setTriggerRead(prev => !prev)}></CreateProduct>
              </div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {tableHead.map((item, index) => (
                        <TableCell key={index} sx={{
                          fontWeight: 'bold',
                          fontSize: '20px',
                        }}>{item}</TableCell>
                      ))}
                      <TableCell sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '20px',
                      }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && data.map((item, index) => (

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
                        <TableCell>{item.name}</TableCell>
                        <TableCell key={`delete-${item.id}`}>
                          <ButtonDeleteProduct key={item.id} id={item.id} isDeleted={item.isDeleted} />
                        </TableCell>
                        <TableCell>
                          <UpdateProduct item={item} image={item.images} onProductUpdated={() => setTriggerRead(prev => !prev)}></UpdateProduct>
                          <ShowDetails id={item.id}></ShowDetails>
                        </TableCell>
                      </TableRow>

                    ))}
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
            </div>
          </div>
        </div>
      </div>

    </ >
  )
}