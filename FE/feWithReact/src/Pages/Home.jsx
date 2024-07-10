import React, { useEffect } from 'react'
import Navbar from '../Components/NavBar/NavBar'
import Header from '../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  useEffect(() => {
    if (role !== '5') {
      navigate('/admin')
    }
    if (role === null) {
      navigate('/')
    }
  }, [role]);
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
    </>
  )
}
