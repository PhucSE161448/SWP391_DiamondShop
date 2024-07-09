import { Button, Box, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import UpdateIcon from '@mui/icons-material/Update'
import SendIcon from '@mui/icons-material/Send'
import React, { useEffect, useState } from 'react'
import { createApi } from '../../../Auth/AuthFunction'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'

export default function UpdateCategory(props) {
  const [open, setOpen] = useState(false)
  const data = props.data
  const [dataType, setDataType] = useState(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setData(null)
  }


  useEffect(() => {
    const url = createApi('Group/GetAllGroup')
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setDataType(responseData)
      })
      .catch((error) => console.error('Error:', error))
  }, [])

  function UpdateCategory(values) {
    const url = createApi(`Category/UpdateCategory/${props.data.id}`)
    const Data = {
      "name": values.nameCategory,
      "isDeleted": false,
      'groupId': values.typeCategory
    }
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(Data)
    })
      .then(response => response.json())
      .then(data => props.onUpdateCategory())
  }


  const validationSchema = Yup.object({
    nameCategory: Yup.string().required('Required'),
    typeCategory: Yup.string().required('Required'),
  })

  const initialValues = {
    nameCategory: data.name,
    typeCategory: data.group.id
  }

  const onSubmit = (values) => {
    const parsedValues = {
      ...values,
      typeCategory: parseInt(values.typeCategory)
    }
    UpdateCategory(parsedValues)
    // formik.resetForm()
  }

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<UpdateIcon />} onClick={handleOpen}>
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 400,
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <h3 className='titleOfForm'>UPDATE CATEGORY</h3>
          <div style={{
            width: '100%'

          }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleChange, values }) => (
                <Form>
                  <div className='row'>
                    <div className='col-6'>
                      <TextField
                        id="nameCategory"
                        name="nameCategory"
                        label="Name"
                        value={values.nameCategory}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                      />
                    </div>
                    <div className='col-6'>
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="typeCategory-label">Type</InputLabel>
                        <Select
                          labelId="typeCategory-label"
                          id="typeCategory"
                          name="typeCategory"
                          value={values.typeCategory}
                          onChange={handleChange}
                          label="Type"
                        >
                          {dataType && dataType.map((data) => (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                        type="submit"
                        sx={{
                          width: '100%',
                          marginTop: '25px',
                        }}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
