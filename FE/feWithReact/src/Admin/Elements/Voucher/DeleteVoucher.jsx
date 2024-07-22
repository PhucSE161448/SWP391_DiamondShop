import React from 'react'
import { Button } from '@mui/material'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'

export default function DeleteVoucher(props) {

  const DeleteVoucher = (id) => {
    const url = createApi(`Voucher/DeleteVoucher/${id}`)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then((response) => {
      checkApiStatus(response)
      props.onVoucherDeleted()
    })
  }

  return (
    <Button onClick={() => DeleteVoucher(props.id)} variant='contained'>Delete</Button>
  )
}
