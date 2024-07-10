import React from 'react'
import { jwtDecode } from 'jwt-decode'
export default function Profile() {
  const userDetail = jwtDecode(localStorage.getItem('token'))
  console.log()
  return (
    <>
      <div>Profile</div>
      <div>
        <div>Username: {userDetail.Username}</div>
        <div>Email: {userDetail.Email}</div>
        <div>Role: {userDetail.Role}</div>
      </div>
    </>
  )
}
