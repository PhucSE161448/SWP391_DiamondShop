import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { createApi } from '../Auth/AuthFunction'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
export default function Profile() {
  const userDetail = jwtDecode(localStorage.getItem('token'))
  const [dataUser, setDataUser] = useState(null)
  const navigate = useNavigate()

  const id = userDetail.Id
  useEffect(() => {
    const getUserData = (id) => {
      const url = createApi(`Account/GetAccountById/${id}`)
      console.log(url)
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      ).then(response =>
        response.json()
      ).then(responseJson =>
        setDataUser(responseJson)
      )
    }
    getUserData(id)
  }, [id])
  return (
    <div>
      <Container>
        <div>Profile</div>
        <div>
          <div>Username: {dataUser?.name}</div>
          <div>Email: {dataUser?.email}</div>
        </div>
        <div>
          <div style={{
            margin: '20px auto',
            width: 'auto',
          }}>
            <Button fullWidth onClick={() => navigate('/order')} variant="contained" size="large" sx={{
              backgroundColor: '#04376a',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#04376a',
                color: '#fff',
              }
            }}>
              Click here to go to your order
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
