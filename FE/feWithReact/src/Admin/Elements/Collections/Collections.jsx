import React, { useEffect } from 'react'
import CRUDCollection from './CRUDCollection'
import { useNavigate } from 'react-router-dom'

export default function DiamondCase() {

  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== '1') {
      navigate('/admin')
    }
  })

  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        <div className='titleOfFormContainer'>
          <h2>Collection</h2>
        </div>
        <div className='buttonContainer'>
          <CRUDCollection></CRUDCollection>
        </div>
      </div>
    </div>
  )
}
