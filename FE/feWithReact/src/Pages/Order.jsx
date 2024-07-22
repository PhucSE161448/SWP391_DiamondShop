import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { createApi } from '../Auth/AuthFunction'
import { Button, Modal, Box, TableRow, TableCell, TableBody, TableHead, Table, TableContainer, Paper, Container } from '@mui/material'
import {
  Stack, Pagination, FormControl, InputLabel,
  Select, OutlinedInput, MenuItem,
  ListItemText
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import { jwtDecode } from 'jwt-decode'
export default function Order() {
  const [order, setOrder] = useState(null)
  const [openPayment, setOpenPayment] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const [orderId, setOrderId] = useState()
  const [status, setStatus] = useState('')
  const [orderDetailId, setOrderDetailId] = useState()
  const [paymentId, setPaymentId] = useState()
  const userData = jwtDecode(localStorage.getItem('token'))
  const userId = userData.Id
  const [triggerRead, setTriggerRead] = useState(false)
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(10)
  const [TotalPage, setTotalPage] = useState(null)
  const [statusSearch, setStatusSearch] = useState([])
  const statusChoice = ['Wait To Approve', 'Approved', 'Paid', 'In Transit', 'Finished', 'Cancelled']
  const params = {
    pageIndex: PageNumber,
    pageSize: PageSize,
    ...(statusSearch != null && { status: statusSearch }),
  }

  const handleChangeStatusSearch = (value) => {
    setStatusSearch(value)
    setTriggerRead(prev => !prev)
  }

  const ITEM_HEIGHT = 120
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }
  const handleOpen = (id) => {
    setOpenPayment(true)
    getOrderDetail(id)
    setOrderDetailId(id)
    setPaymentId(1)
  }

  const handleClose = () => {
    setOpenPayment(false)
  }

  const handleOpenDetail = (id, status) => {
    setOpenDetail(true)
    getOrderDetail(id)
    setStatus(status)
    setOrderId(id)
  }

  const handleCloseDetail = () => {
    setOpenDetail(false)
    setOrderId(null)
    setOrderDetail([])
  }


  const handlePayment = (userId, paymentId, orderDetailId) => {
    const url = createApi(`PayOs/Checkout?userId=${userId}&orderId=${orderDetailId}&paymentId=${paymentId}`)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => response.json())
      .then(data => {
        window.open(data.url, '_blank').focus()
      })
  }

  const handlePageChange = (event, value) => {
    setPageNumber(value)
    setTriggerRead(prev => !prev)
  }

  const styleOrderContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
    padding: '20px',
    border: '1px solid black',
    borderRadius: '10px',
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    boxShadow: '0 0 10px 5px rgba(0,0,0,0.3)',
  }

  const styleButton = {
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    }
  }

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
          setOrder(data)
          setTotalPage(Math.ceil(data.totalItemsCount / PageSize))
        })
    }
    getOrder()
  }, [triggerRead])


  const getOrderDetail = async (id) => {
    const url = createApi(`Order/GetProductDetailById/${id}`);
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => response.json())
      .then(data => {
        setOrderDetail(data)
      })
  }


  const headerTable = ['#', 'Order date', 'Total price', 'Status', 'Phone', 'Address', '']
  const headerTableDetail = ['Image', 'Name', 'Total price', 'Quantity']

  const statusColor = {
    'Wait To Approve': '#7b818a',
    'Approved': '#64d9ff',
    'Paid': '#00e200',
    'In Transit': '#f9d800',
    'Finished': '#ffb03d',
    'Cancelled': '#ff2a04'
  }
  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      {order ? (
        <div style={{
          paddingBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            <h1>Order</h1>
          </div>
          <div style={styleOrderContainer}>
            <FormControl sx={{
              width: '100%',
              marginBottom: '20px',
            }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                MenuProps={MenuProps}
                value={statusSearch}
                onChange={(e) => handleChangeStatusSearch(e.target.value)}
                input={<OutlinedInput label="Status" />}
              >
                {statusChoice.map((name) => (
                  <MenuItem key={name} value={name}>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TableContainer component={Paper} fullWidth>
              <Table >
                <TableHead sx={{
                  width: '100%'
                }}>
                  <TableRow>
                    {headerTable.map((item, index) => (
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
                <TableBody sx={{
                  width: '100%'
                }}>

                  {order.items && order.items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        {new Date(item.createdDate).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell>
                        ${item.totalPrice.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="contained"
                          sx={{
                            backgroundColor: statusColor[item.status] || 'black',
                            '&:hover': {
                              backgroundColor: statusColor[item.status] || 'black',
                            }
                          }}>
                          {item.status}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {item.phone}
                      </TableCell>
                      <TableCell>
                        {item.address}
                      </TableCell>
                      <TableCell>
                        {item.status === 'Approved' ?
                          <Button variant='contained' size='large' endIcon={<PaymentOutlinedIcon />} sx={styleButton} onClick={() => handleOpen(item.id)}>
                            Pay now
                          </Button> :
                          <Button variant='contained' size='large' onClick={() => handleOpenDetail(item.id, item.status)} sx={{
                            backgroundColor: '#f1c232',
                            color: '#000',
                            '&:hover': {
                              backgroundColor: '#fff',
                              color: '#000',
                            }
                          }}>
                            Detail
                          </Button>
                        }
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Stack sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} />
              </Stack>
            </TableContainer>
          </div>

        </div>
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
        open={openPayment}
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
          width: '80%',
          maxHeight: '80vh',
          p: 4,
          overflow: 'auto',
        }}>
          <div>
            <h2>Payment</h2>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{
                    backgroundColor: '#001529',
                  }}>
                    {headerTableDetail.map((item, index) => (
                      <TableCell key={index} sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '20px',
                      }}>
                        {item}
                      </TableCell>

                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img src={item.cart.product ? (item.cart.product.images[0]?.urlPath) : (item.cart.diamond.images[0]?.urlPath)} style={{
                          width: '150px',
                          height: '150px',
                        }} />
                      </TableCell>
                      <TableCell>{item.cart.product ? (item.cart.product.name) : (item.cart.diamond.name)}</TableCell>
                      <TableCell>${item.cart.totalPrice.toLocaleString()}</TableCell>
                      <TableCell >{item.cart.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <div>
              <Button onClick={() => handlePayment(userId, paymentId, orderDetailId)}>
                <img src="https://payos.vn/docs/img/logo.svg" alt="" style={{
                  height: '100px',
                }} />
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openDetail}
        onClose={handleCloseDetail}
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
          width: '80%',
          maxHeight: '80vh',
          p: 4,
          overflow: 'auto',
        }}>
          <div>
            <h2>Detail</h2>
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow sx={{
                    backgroundColor: '#001529',
                  }}>
                    {headerTableDetail.map((item, index) => (
                      <TableCell key={index} sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '20px',
                      }}>
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail && orderDetail.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img src={item.cart.product ? item.cart.product.images[0].urlPath : item.cart.diamond.images[0]?.urlPath} style={{
                          width: '150px',
                          height: '150px',
                        }} />
                      </TableCell>
                      <TableCell>{item.cart.product ? (item.cart.product.name) : (item.cart.diamond.name)}</TableCell>
                      <TableCell>${item.cart.totalPrice.toLocaleString()}</TableCell>
                      <TableCell>{item.cart.quantity}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(status === 'Paid' || status === 'Finished' || status === 'In Transit') && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%'
              }}>
                <div>
                  <Button size='large'
                    variant='contained'
                    color='primary'
                    onClick={() => window.open(`/pdfCert/${orderId}`, '_blank')}>
                    Certificate pdf file
                  </Button>
                </div>
                <div>
                  <Button size='large'
                    variant='contained'
                    color='secondary'
                    onClick={() => window.open(`/pdfWarranty/${orderId}`, '_blank')}>
                    Warranty pdf file
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div >
  )
}
