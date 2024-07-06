import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createApi } from '../../../Auth/AuthFunction'
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Button, MenuItem } from '@mui/material'
export default function OrderAdmin() {
  const [dataOrder, setDataOrder] = useState([])
  const [triggerRead, setTriggerRead] = useState(false)
  const role = localStorage.getItem('role')
  const status = ['Wait To Approve', 'Approved ', 'Finished ']
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

  const finishButton = (id) => {
    createStatus(id, status[2])
  }

  const cancelButtonSale = (id) => {
    createStatus(id, status[0])
  }

  const cancelButtonDelivery = (id) => {
    createStatus(id, status[1])
  }

  const approveButton = (id) => {
    createStatus(id, status[1])
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '90vw',
      height: '100vh',
      position: 'absolute',
      right: '0',
    }}>
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
              <TableHead>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Order Total</TableCell>
              </TableHead>
              <TableBody>
                {dataOrder.filter(order => order.status === 'Wait To Approve').map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.createdDate}</TableCell>
                    <TableCell>{order.accountName}</TableCell>
                    <TableCell>
                      <div>
                        {order.status}
                      </div> <br />
                      {(role === '1' || role === '3') && (
                        <div>
                          <Button variant="contained" onClick={() => approveButton(order.id)}>Approve</Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <div>
        <div>
          <h2>
            Approved
          </h2>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell >Order Status</TableCell>
              <TableCell>Order Total</TableCell>
            </TableHead>
            <TableBody>
              {dataOrder.filter(order => order.status === 'Approved').map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.createdDate}</TableCell>
                  <TableCell>{order.accountName}</TableCell>
                  <TableCell>
                    <div>
                      {order.status}
                    </div> <br />
                    {((role === '1' || role === '4')) && (
                      <>
                        <div>
                          <Button variant="contained" onClick={() => finishButton(order.id)}>
                            Finish
                          </Button>
                        </div> <br />
                      </>
                    )}
                    {(role === '1' || role === '3') && (
                      <>
                        <div>
                          <Button variant="contained" color='error' onClick={() => cancelButtonSale(order.id)}>
                            Cancel
                          </Button>
                        </div> <br />
                      </>
                    )}
                  </TableCell>
                  <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {(role === '1' || role === '4') && (
        <div>
          <div>
            <h2>
              Finished
            </h2>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Order Total</TableCell>
              </TableHead>
              <TableBody>
                {dataOrder.filter(order => order.status === 'Finished').map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.createdDate}</TableCell>
                    <TableCell>{order.accountName}</TableCell>
                    <TableCell>
                      <div>
                        {order.status}
                      </div> <br />
                      {(role === '1' || role === '4') && (
                        <div>
                          <Button variant="contained" color='error' onClick={() => cancelButtonDelivery(order.id)}>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  )
}
