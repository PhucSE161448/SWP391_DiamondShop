import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createApi } from '../../../Auth/AuthFunction'
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Button, Modal, Box } from '@mui/material'

export default function OrderAdmin() {
  const [dataOrder, setDataOrder] = useState([])
  const [triggerRead, setTriggerRead] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const [idOrder, setIdOrder] = useState(null)
  const [open, setOpen] = useState(false)
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
  const status = ['Wait To Approve', 'Approved', 'Finished', 'Paid']
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== '1' && role !== '3' && role !== '4') {
      navigate('/admin')
    }
  })


  useEffect(() => {
    const getOrder = () => {
      const url = createApi('Order/Get')
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          setDataOrder(data)
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
    }).then(response => response.json())
      .then(data => {
        setTriggerRead(prev => !prev);
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
    createStatus(id, status[2])
  }

  const cancelButtonSale = (id) => {
    createStatus(id, status[0])
  }

  const cancelPaid = (id) => {
    createStatus(id, status[1])
  }

  const cancelButtonDelivery = (id) => {
    createStatus(id, status[3])
  }

  const approveButton = (id) => {
    createStatus(id, status[1])
  }

  const headerTable = ['Order ID', 'Order Date', 'Customer Name', 'Order Status', 'Order Total', 'Phone', 'Address', 'Detail']
  const headerTableDetail = ['Image', 'Product Name', 'Quantity', 'Price']
  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center'
        }}>
          <h2>Order</h2>
        </div>
        {(role === '1' || role === '3') && (
          <div>
            <div>
              <h2>
                Wait To Approve
              </h2>
            </div>
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
                  {dataOrder.filter(order => order.status === 'Wait To Approve').map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
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
                            {order.status}
                          </div>
                          {(role === '1' || role === '3') && (
                            <div>
                              <Button variant="contained" onClick={() => approveButton(order.id)}>Approve</Button>
                            </div>
                          )}
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
                        <Button onClick={() => handleOpen(order.id)}>
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {(role === '1' || role === '3') && (
          <div>
            <div>
              <h2>
                Approved
              </h2>
            </div>
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
                  {dataOrder.filter(order => order.status === 'Approved').map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.createdDate}</TableCell>
                      <TableCell>{order.accountName}</TableCell>
                      <TableCell>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                          {(role === '1') && (
                            <div>
                              <Button variant="contained" color='info' onClick={() => cancelButtonDelivery(order.id)}>
                                Paid
                              </Button>
                            </div>
                          )}
                          <div style={{
                            marginRight: '20px',
                            marginLeft: '20px'
                          }}>
                            {order.status}
                          </div> <br />

                          {(role === '1' || role === '3') && (
                            <div>
                              <Button variant="contained" color='error' onClick={() => cancelButtonSale(order.id)}>
                                Cancel
                              </Button>
                            </div>
                          )}
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
                        <Button onClick={() => handleOpen(order.id)}>
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {(role === '1' || role === '4') && (
          <div>
            <div>
              <h2>
                Paid
              </h2>
            </div>
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
                  {dataOrder.filter(order => order.status === 'Paid').map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
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
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                            {(role === '1') && (
                              <div>
                                <Button variant="contained" color='error' onClick={() => cancelPaid(order.id)}>
                                  Unpaid
                                </Button>
                              </div>
                            )}
                            <div style={{
                              marginRight: '20px',
                              marginLeft: '20px'
                            }}>
                              {order.status}
                            </div> <br />
                            {(role === '1' || role === '4') && (
                              <div>
                                <Button variant="contained" color='primary' onClick={() => finishButton(order.id)}>
                                  Finish
                                </Button>
                              </div>
                            )}
                          </div> <br />
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
                        <Button onClick={() => handleOpen(order.id)}>
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {(role === '1' || role === '4') && (
          <div>
            <div>
              <h2>
                Finished
              </h2>
            </div>
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
                  {dataOrder.filter(order => order.status === 'Finished').map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
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
                            {order.status}
                          </div> <br />
                          {(role === '1' || role === '4') && (
                            <div>
                              <Button variant="contained" color='error' onClick={() => cancelButtonDelivery(order.id)}>
                                Cancel
                              </Button>
                            </div>
                          )}
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
                        <Button onClick={() => handleOpen(order.id)}>
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
            height: '100vh',
            width: '100vw',
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
                      <img src={item.cart.product ? (item.cart.product.images[0].urlPath) : null} style={{
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
