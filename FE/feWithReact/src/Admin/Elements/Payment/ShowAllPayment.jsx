import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import ButtonDeletePayment from './ButtonDeletePayment'
import CreatePayment from './CreatePayment'
import UpdatePayment from './UpdatePayment'
export default function ShowAllPayment() {
  const role = localStorage.getItem('role')
  const [dataType, setDataType] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)

  const dataRow = ['#', 'Name', 'Status', 'Action']
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== '1') {
      navigate('/admin')
    }
  })

  useEffect(() => {
    const url = createApi('Payment/GetAll')
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setDataType(responseData)
      })
      .catch((error) => console.error('Error:', error))
  }, [triggerRead])


  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        <div className='titleOfFormContainer'>
          <h2>Payment</h2>
        </div>
        <div>
          <CreatePayment onPaymentCreated={() => setTriggerRead(prev => !prev)}></CreatePayment>
        </div>
        <div className='buttonContainer'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {dataRow.map((item, index) => (
                    <TableCell key={index} sx={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}>
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Array.isArray(dataType) && dataType.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>
                        <ButtonDeletePayment id={data.id} isDeleted={data.isDeleted} onDeletePayment={() => setTriggerRead(prev => !prev)} />
                      </TableCell>
                      <TableCell>
                        <UpdatePayment data={data} onUpdatePayment={() => setTriggerRead(prev => !prev)}></UpdatePayment>
                      </TableCell>
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
