import React, { useEffect } from 'react'
import ShowAllWarranty from './ShowAllWarranty'
import { useNavigate } from 'react-router-dom'
export default function Warranty() {
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (role !== '1') {
      navigate('/admin')
    }
  })
  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        <div className='titleOfFormContainer'>
          <h2>Warranty</h2>
        </div>
        <div className='buttonContainer'>
          <ShowAllWarranty></ShowAllWarranty>
        </div>
      </div>
    </div>
  )
}
