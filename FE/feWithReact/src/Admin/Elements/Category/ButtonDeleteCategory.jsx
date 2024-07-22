import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import {  createApi } from '../../../Auth/AuthFunction'
export default function ButtonDeleteCategory(props) {
  const [isDeleted, setIsDeleted] = useState(props.isDeleted)
  const handleChange = (event) => {
    setIsDeleted(!event.target.checked)
    DeleteCategory(props.id, !event.target.checked ? 1 : 0)
  }

  function DeleteCategory(id, status) {
    const url = createApi(`Category/DeleteOrEnable/${id}/${status}`)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => checkApiStatus(response))
      .catch(error => console.error('Error:', error));
  }
  return (
    <>
      <FormControlLabel
        control={<Switch checked={!isDeleted} onChange={handleChange} />}
      />
    </>
  )
}
