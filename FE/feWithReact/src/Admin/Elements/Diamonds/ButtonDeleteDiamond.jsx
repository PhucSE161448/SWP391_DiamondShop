import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { createApi } from '../../../Auth/AuthFunction'
export default function ButtonDeleteDiamond(props) {
  const [isDeleted, setIsDeleted] = useState(props.isDeleted)
  const handleChange = (event) => {
    setIsDeleted(!event.target.checked)
    DeleteProduct(props.id, !event.target.checked ? 1 : 0)
  }

  function DeleteProduct(id, status) {
    const url = createApi(`Diamond/DeleteOrEnable/${id}/${status}`)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then((response) => {
      props.onDiamondDeleted()
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
