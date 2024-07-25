import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'
import {
  TableContainer, Table, TableHead, TableBody,
  TableCell, TableRow, Button, Modal,
  Box, Stack, Pagination, FormControl, InputLabel,
  Select, OutlinedInput, MenuItem,
  ListItemText, CircularProgress
} from '@mui/material'

export default function OrderAdmin() {
  const [searchParams] = useSearchParams()
  const [dataOrder, setDataOrder] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const [PageNumber, setPageNumber] = useState(searchParams.get('pageNumber') || 1)
  const [PageSize, setPageSize] = useState(10)
  const [TotalPage, setTotalPage] = useState(null)
  const [status, setStatus] = useState(searchParams.get('status') || 'Default')
  const [orderDetail, setOrderDetail] = useState([])
  const [idOrder, setIdOrder] = useState(null)
  const [open, setOpen] = useState(false)
  const params = {
    pageIndex: PageNumber,
    pageSize: PageSize,
    ...(status !== 'Default' && { status: status }),
  }

  const handleOpen = (id) => {
    setIdOrder(id)
    setOpen(true)
    getOrderDetail(id)
  }
  const handleClose = () => {
    setOpen(false)
    setIdOrder(null)
    setOrderDetail([])
  }
  const role = localStorage.getItem('role')
  const statusChoice = ['Wait To Approve', 'Approved', 'Paid', 'In Transit', 'Finished', 'Cancelled', 'Default']
  const navigate = useNavigate()
  const ITEM_HEIGHT = 120
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }

  const statusColor = {
    'Wait To Approve': '#7b818a',
    'Approved': '#050A30',
    'Paid': '#00e200',
    'In Transit': '#1616FF',
    'Finished': '#ffb03d',
    'Cancelled': '#ff2a04'
  };

  const handleChangeStatus = (value) => {
    navigate(`/admin/order?pageNumber=1&status=${value}`)
    setDataOrder(null)
    setStatus(value)
    setPageNumber(1)
    setTriggerRead(prev => !prev)
  }

  useEffect(() => {
    if (role !== '1' && role !== '3' && role !== '4') {
      navigate('/admin')
    }
  })

  useEffect(() => {
    const getOrder = () => {
      let queryString = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) { // Check if value is an array
          value.forEach((item) => queryString.append(key, item));
        } else {
          queryString.append(key, value);
        }
      });
      const url = createApi(`Order/Get?${queryString.toString()}`)
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          setDataOrder(data)
          setTotalPage(Math.ceil(data.totalItemsCount / PageSize))
        })
    }
    getOrder()
  }, [triggerRead])

  const createStatus = (orderId, status) => {
    const url = createApi(`Order/CreateStatus?orderId=${orderId}&status=${status}`)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => {
      checkApiStatus(response)
      setTriggerRead(prev => !prev)
    })
  }

  const getOrderDetail = (id) => {
    const url = createApi(`Order/GetProductDetailById/${id}`);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => response.json())
      .then(data => setOrderDetail(data))

  }

  const finishButton = (id) => {
    createStatus(id, 'Finished')
  }

  const inTransitButton = (id) => {
    createStatus(id, 'In Transit')
  }

  const approveButton = (id) => {
    createStatus(id, 'Approved')
  }

  const cancelButton = (id) => {
    createStatus(id, 'Cancelled')
  }

  const handlePageChange = (event, value) => {
    navigate(`/admin/order?pageNumber=${value}&status=${status}`)
    setDataOrder(null)
    setPageNumber(value)
    setTriggerRead(prev => !prev)
  }

  const headerTable = ['Order Date', 'Customer Name', 'Order Status', 'Order Total', 'Phone', 'Address', 'Payment method', 'Detail', '']
  const headerTableDetail = ['Image', 'Product Name', 'Quantity', 'Price']

  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <div>
            <h2>Order</h2>
          </div>
          <FormControl sx={{
            minWidth: 240,
          }}>
            <InputLabel>
              Status
            </InputLabel>
            <Select
              label="Status"
              MenuProps={MenuProps}
              value={status}
              onChange={(e) => handleChangeStatus(e.target.value)}
              input={<OutlinedInput label="Status" />}
            >
              {statusChoice && statusChoice.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {dataOrder ? (
          <>
            <div>
              <TableContainer>
                <Table>
                  <TableHead style={{
                    backgroundColor: 'lightgray'
                  }}>
                    {headerTable.map((header) => (
                      <TableCell sx={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                      }}>{header}</TableCell>
                    ))}
                  </TableHead>

                  <TableBody>
                    {dataOrder.items?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.createdDate}</TableCell>
                        <TableCell>{order.accountName}</TableCell>
                        <TableCell>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                            <div style={{
                              marginRight: '20px'
                            }}>
                              <Button variant="contained"
                                sx={{
                                  backgroundColor: statusColor[order.status] || 'black',
                                  '&:hover': {
                                    backgroundColor: statusColor[order.status] || 'black',
                                  }
                                }}>
                                {order.status}
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
                        <TableCell>
                          {order.phone}
                        </TableCell>
                        <TableCell>
                          {order.address}
                        </TableCell>
                        <TableCell>
                          {order.paymentName}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleOpen(order.id)}>
                            Detail
                          </Button>
                        </TableCell>
                        <TableCell>
                          {(order.status === 'Wait To Approve') && (
                            <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '10px',
                            }}>
                              <div>
                                <Button variant="contained" onClick={() => approveButton(order.id)}>Approve</Button>
                              </div>
                              <div>
                                <Button variant="contained" onClick={() => cancelButton(order.id)} color='error'>Cancel</Button>
                              </div>
                            </div>
                          )}
                          {(order.status === 'Paid') && (
                            <div>
                              <Button variant="contained" color='secondary' onClick={() => inTransitButton(order.id)}>
                                In Transit
                              </Button>
                            </div>
                          )}
                          {(order.status === 'In Transit') && (
                            <div>
                              <Button variant="contained" color='warning' onClick={() => finishButton(order.id)}>
                                Finished
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Stack sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} />
            </Stack>
          </>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '100%',
          }}>
            <CircularProgress />
          </div>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
            width: '50%',
            height: '50%',
          }}>
            <div>
              <h3>Order ID: {idOrder}</h3>
            </div>
            <Table sx={{
              border: '1px solid #e0e0e0',
            }}>
              <TableHead>
                <TableRow sx={{
                  backgroundColor: '#d3d3d3',
                }}>
                  {headerTableDetail.map((item, index) => (
                    <TableCell key={index} sx={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}>
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {orderDetail.map((item, index) => (
                <TableBody key={index}>
                  <TableCell>
                    <div>
                      <img src={item.cart.product ? (item.cart.product.images[0]?.urlPath) : null} style={{
                        width: '150px',
                        height: '150px',
                      }} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{item.cart.product ? (item.cart.product.name) : null}</div>
                  </TableCell>
                  <TableCell>
                    <div>{item.cart.quantity}</div>
                  </TableCell>
                  <TableCell>
                    <div>${item.cart.totalPrice.toLocaleString()}</div>
                  </TableCell>
                </TableBody>
              ))}
            </Table >
            <div>
              <Button type="button"
                value="Clear" onClick={handleClose}
                className='submitButton'
                variant="contained" size="large" color="error"
                sx={{
                  margin: '5px',
                }}>
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  )
}
