import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
export default function ButtonDeleteProduct(props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const handleChange = (event) => {
    setIsDeleted(event.target.checked)
    DeleteProduct(props.id, event.target.checked ? 1 : 0)
  }

  function DeleteProduct(id, status) {
    const url = 'https://localhost:7122/api/Product/DeleteOrEnable/' + id + '/' + status
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
      <>
        <FormControlLabel
          control={<Switch checked={isDeleted} onChange={handleChange} />}
          label="Deleted"
        />
        <div>isDeleted? {isDeleted ? 'Yes' : 'No'}</div>
      </>
    </>
  )
}
