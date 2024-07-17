import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Button } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import CreateVoucher from './CreateVoucher'
import DeleteVoucher from './DeleteVoucher'
export default function ShowAllVoucher() {
  const role = localStorage.getItem('role')
  const [dataVoucher, setDataVoucher] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const dataRow = ['id', 'Product', 'For all product', 'Discount Percentage', 'Start Date', 'End Date']
  useEffect(() => {
    if (role !== '1') {
      navigate('/admin')
    }
  })

  useEffect(() => {
    const url = createApi('Voucher/GetAllVoucher')
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setDataVoucher(responseData)
      })
      .catch((error) => console.error('Error:', error))
  }, [triggerRead])


  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        <div className='titleOfFormContainer'>
          <h2>Voucher</h2>
        </div>
        <div>
          <CreateVoucher onVoucherCreated={() => setTriggerRead(prev => !prev)}></CreateVoucher>
        </div>
        <div className='buttonContainer'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {dataRow.map((item, index) => (
                    <TableCell key={index}>{item}</TableCell>
                  ))}
                  <TableCell>Deleted</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Array.isArray(dataVoucher) && dataVoucher.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.productId === 0 ? 'Null' : data.productId}</TableCell>
                      <TableCell>{data.isAllProduct ? 'True' : 'False'}</TableCell>
                      <TableCell>{data.discountPercentage}</TableCell>
                      <TableCell>{new Date(data.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(data.endDate).toLocaleDateString()}</TableCell>
                      <TableCell><DeleteVoucher id={data.id} onVoucherDeleted={() => setTriggerRead(prev => !prev)}></DeleteVoucher></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </div>
    </div>
  )
}
