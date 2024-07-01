import React from 'react'
import CRUDCollection from './CRUDCollection'

export default function DiamondCase() {
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
