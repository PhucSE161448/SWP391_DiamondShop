import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, CircularProgress } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import CreatePromotion from './CreatePromotion'
import DeletePromotion from './DeletePromotion'
export default function ShowAllPromotion() {
  const role = localStorage.getItem('role')
  const [dataPromotion, setDataPromotion] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const dataRow = ['Point', 'Discount Percentage',]
  useEffect(() => {
    if (role !== '1') {
      navigate('/admin')
    }
  })

  useEffect(() => {
    const url = createApi('Promotion/GetAllPromotion')
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setDataPromotion(responseData.sort((a, b) => a.point - b.point))
      })
      .catch((error) => console.error('Error:', error))
  }, [triggerRead])



  return (
    <div className='contentAdminContainer'>
      {dataPromotion ? (
        <div className='CRUDContainer '>
          <div className='titleOfFormContainer'>
            <h2>Promotion</h2>
          </div>
          <div>
            <CreatePromotion onPromotionCreated={() => setTriggerRead(prev => !prev)}></CreatePromotion>
          </div>
          <div className='buttonContainer'>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {dataRow.map((item, index) => (
                      <TableCell key={index} sx={{
                        fontWeight: 'bold',
                        fontSize: '20px'
                      }}>
                        {item}
                      </TableCell>
                    ))}
                    <TableCell>Deleted</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Array.isArray(dataPromotion) && dataPromotion.map((data, index) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.point}</TableCell>
                        <TableCell>{data.discountPercentage}%</TableCell>
                        <TableCell><DeletePromotion id={data.id} onPromotionDeleted={() => setTriggerRead(prev => !prev)}></DeletePromotion></TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
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
    </div>
  )
}
