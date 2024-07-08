import React, { useEffect, useState } from 'react'
import { createApi } from '../Auth/AuthFunction'
import { Button, Modal, Box, TableRow, TableCell, TableBody, TableHead, Table, TableContainer, Paper } from '@mui/material'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
export default function OrderHistory() {
  const [order, setOrder] = useState([])

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

  const OrderDetailComponent = (props) => {
    const [orderDetail, setOrderDetail] = useState([])
    const [totalPrice, setTotalPrice] = useState(props.totalPrice)
    const [status, setStatus] = useState(props.status)

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

    const headerTable = ['Image', 'Product Name', 'Quantity', 'Price']

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
            {console.log(orderDetail)}
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
            <Button variant='contained' size='large' endIcon={<PaymentOutlinedIcon></PaymentOutlinedIcon>} sx={styleButton}>
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
        <div>
          <h2>Wait To Approve</h2>
        </div>
        {order.filter(item => item.status === 'Wait To Approve').map((item) => (
          <div key={item.id} style={{
            width: '100%'
          }}>
            <OrderDetailComponent item={item} status={item.status} totalPrice={item.totalPrice}></OrderDetailComponent>
          </div>
        ))}
      </div>
      <div style={styleOrderContainer}>
        <div>
          <h2>Finished</h2>
        </div>
        {order.filter(item => item.status === 'Finished').map((item) => (
          <div key={item.id} style={{
            width: '100%'
          }}>
            <OrderDetailComponent item={item} status={item.status} totalPrice={item.totalPrice}></OrderDetailComponent>
          </div>
        ))}
      </div>
      
    </div>
  )
}
