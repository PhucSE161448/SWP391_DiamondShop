import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { createApi, checkApiStatus } from '../../../Auth/AuthFunction'
export default function ButtonDeleteDiamondCase(props) {
  const [isDeleted, setIsDeleted] = useState(props.isDeleted)
  const handleChange = (event) => {
    setIsDeleted(!event.target.checked)
    DeleteDiamondCase(props.id, !event.target.checked ? 1 : 0)
  }

  function DeleteDiamondCase(id, status) {
    const url = createApi(`DiamondCase/DeleteOrEnable/${id}/${status}`)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => checkApiStatus(response))
  }
  return (
    <>
      <FormControlLabel
        control={<Switch checked={!isDeleted} onChange={handleChange} />}
      />
    </>
  )
}
