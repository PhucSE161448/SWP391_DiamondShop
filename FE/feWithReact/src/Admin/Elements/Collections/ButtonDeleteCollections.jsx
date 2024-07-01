import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { createApi } from '../../../Auth/AuthFunction'
export default function ButtonDeleteCollections(props) {
  const [isDeleted, setIsDeleted] = useState(props.isDeleted)
  const handleChange = (event) => {
    setIsDeleted(event.target.checked)
    DeleteDiamondCase(props.id, event.target.checked ? 1 : 0)
  }

  function DeleteDiamondCase(id, status) {
    const url = createApi(`Collection/DeleteOrEnable/${id}/${status}`)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
    })
  }
  return (
    <>
      <FormControlLabel
        control={<Switch checked={isDeleted} onChange={handleChange} />}
        label="Deleted"
      />
    </>
  )
}
