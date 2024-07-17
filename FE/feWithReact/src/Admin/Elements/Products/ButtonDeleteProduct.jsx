import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { createApi } from '../../../Auth/AuthFunction'
export default function ButtonDeleteProduct(props) {
  const [isDeleted, setIsDeleted] = useState(props.isDeleted)
  const handleChange = (event) => {
    setIsDeleted(!event.target.checked)
    DeleteProduct(props.id, !event.target.checked ? 1 : 0)
  }

  function DeleteProduct(id, status) {
    const url = createApi(`Product/DeleteOrEnable/${id}/${status}`)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
  }
  return (
    <>
      <FormControlLabel
        control={<Switch checked={!isDeleted} onChange={handleChange} />}
      />
    </>
  )
}
