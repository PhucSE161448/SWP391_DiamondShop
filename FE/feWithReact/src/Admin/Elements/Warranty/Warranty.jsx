import React from 'react'
import ShowAllWarranty from './ShowAllWarranty'
export default function Warranty() {
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
