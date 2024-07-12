import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { createApi } from '../Auth/AuthFunction'
export default function Profile() {
  const userDetail = jwtDecode(localStorage.getItem('token'))
  const [dataUser, setDataUser] = useState(null)
  console.log(userDetail)

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
    <>
      <div>Profile</div>
      <div>
        <div>Username: {dataUser?.name}</div>
        <div>Email: {dataUser?.email}</div>
      </div>
    </>
  )
}
