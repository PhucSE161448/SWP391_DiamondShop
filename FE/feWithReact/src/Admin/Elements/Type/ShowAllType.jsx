import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Pagination, Button } from '@mui/material'
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, ImageListItem, styled } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import ButtonDeleteType from './ButtonDeleteType'
import CreateType from './CreateType'
import UpdateType from './UpdateType'
export default function ShowAllType() {
  const role = localStorage.getItem('role')
  const [dataType, setDataType] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)

  const dataRow = ['#', 'NAME']
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== '1') {
      navigate('/admin')
    }
  })

  useEffect(() => {
    const url = createApi('Group/GetAllGroup')
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
          <h2>Type</h2>
        </div>
        <div>
          <CreateType onTypeCreated={() => setTriggerRead(prev => !prev)}></CreateType>
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
                  Array.isArray(dataType) && dataType.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>
                        <ButtonDeleteType id={data.id} isDeleted={data.isDeleted} onDeleteType={() => setTriggerRead(prev => !prev)} />
                      </TableCell>
                      <TableCell>
                        <UpdateType data={data} onUpdateType={() => setTriggerRead(prev => !prev)}></UpdateType>
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
