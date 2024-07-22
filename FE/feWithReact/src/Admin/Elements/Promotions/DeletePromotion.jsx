import React from 'react'
import { Button } from '@mui/material'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'

export default function DeletePromotion(props) {

  const DeletePromotion = (id) => {
    const url = createApi(`Promotion/DeletePromotion/${id}`)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then((response) => {
      checkApiStatus(response)
      props.onPromotionDeleted()
    })
  }

  return (
    <Button onClick={() => DeletePromotion(props.id)} variant='contained'>Delete</Button>
  )
}
