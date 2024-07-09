import React, { useEffect, useState } from 'react'
import { createApi } from '../Auth/AuthFunction'
import { Button, Modal, Box, TableRow, TableCell, TableBody, TableHead, Table, TableContainer, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
export default function Order() {
  const [order, setOrder] = useState([])
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const handleOpen = (id) => {
    setOpen(true)
    getOrderDetail(id)
  }
  const handleClose = () => {
    setOpen(false)
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
    backgroundColor: '#ad2a36',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    }
  }

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
          setOrder(data)
        })
    }
    getOrder()
  }, [])

  const getOrderDetail = (id) => {
    const url = createApi(`Order/GetProductDetailById/${id}`);
    fetch(url, {
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

  const headerTable = ['Image', 'Product Name', 'Quantity', 'Price']

  const OrderDetailComponent = (props) => {
    const [orderDetail, setOrderDetail] = useState([])
    const totalPrice = props.totalPrice
    const status = props.status

    const getOrderDetail = (id) => {
      const url = createApi(`Order/GetProductDetailById/${id}`);
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          setOrderDetail(prevDetails => {
            const newData = Array.isArray(data) ? data : [data]
            if (JSON.stringify(prevDetails) !== JSON.stringify(newData)) {
              return newData
            }
            return prevDetails
          })
        })
    }

    useEffect(() => {
      if (props.item.id) {
        getOrderDetail(props.item.id)
      }
    }, [props.item.id])

    return (
      <TableContainer component={Paper} sx={{
        width: '100%',
        margin: '10px',
        padding: '10px',
        borderRadius: '10px',

      }}>
        <Table >
          <TableHead>
            <TableRow sx={{
              backgroundColor: '#001529',
            }}>
              {headerTable.map((item, index) => (
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
                  <img src={item.cart.product ? (item.cart.product.images[0].urlPath) : null} style={{
                    width: '150px',
                    height: '150px',
                  }} />
                </TableCell>
                <TableCell>{item.cart.product ? (item.cart.product.name) : null}</TableCell>
                <TableCell>{item.cart.quantity}</TableCell>
                <TableCell>${item.cart.totalPrice.toLocaleString()}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
        <div>
          <h2>Total: ${totalPrice.toLocaleString()}</h2>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          {status === 'Approved' &&
            <Button variant='contained' size='large' endIcon={<PaymentOutlinedIcon></PaymentOutlinedIcon>} sx={styleButton} onClick={() => handleOpen(props.item.id)}>
              Pay now
            </Button>
          }
        </div>
      </TableContainer>
    )
  }

  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '120px',
        paddingTop: '20px',
      }}>
        <Button onClick={() => navigate('/orderHistory')} variant='contained' style={{
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
          }
        }}>
          Order History
        </Button>
      </div>
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
          {order.filter(item => item.status === 'Approved').map((item) => (
            <div key={item.id} style={{
              width: '100%'
            }}>
              <OrderDetailComponent item={item} status={item.status} totalPrice={item.totalPrice}></OrderDetailComponent>
            </div>
          ))}
        </div>
      </div>
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
          width: '80%',
          p: 4,
        }}>
          <div>
            <h2>Payment</h2>
            <Table >
              <TableHead>
                <TableRow sx={{
                  backgroundColor: '#001529',
                }}>
                  {headerTable.map((item, index) => (
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
                      <img src={item.cart.product ? (item.cart.product.images[0].urlPath) : null} style={{
                        width: '150px',
                        height: '150px',
                      }} />
                    </TableCell>
                    <TableCell>{item.cart.product ? (item.cart.product.name) : null}</TableCell>
                    <TableCell>{item.cart.quantity}</TableCell>
                    <TableCell>${item.cart.totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <div >
              <Button >
                <img src='https://developers.momo.vn/v3/vi/assets/images/monotone2-6cba14ec790b5c80874da2ef5bfdb1c5.png' alt="" style={{
                  width: '100px',
                }} />
              </Button>
            </div>
            <div>
              <Button>
                <img src="https://vudigital.co/wp-content/uploads/2022/04/9.webp" alt="" style={{
                  height: '100px',
                }} />
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
