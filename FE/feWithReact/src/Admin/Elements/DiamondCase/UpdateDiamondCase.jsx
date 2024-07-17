import React, { useState } from 'react'
import { Button, TextField, Modal, Box, Alert, Radio, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import SendIcon from '@mui/icons-material/Send'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close'
import { createApi } from '../../../Auth/AuthFunction'

export default function UpdateDiamondCase(props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    color: Yup.string().required('Required'),
    material: Yup.string().required('Required')
  })

  const initialValues = {
    name: props.data.name,
    color: props.data.color,
    material: props.data.material
  }

  const onSubmit = (values) => {
    Update(values)

  }

  const Update = (values) => {
    const url = createApi(`DiamondCase/UpdateDiamondCase/${props.id}`)
    const data = {
      "name": values.name,
      "color": values.color,
      "material": values.material
    }
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        setResponseCode(response.status)
      })
      .then(responseData => {
        handleClose()
        props.onDiamondCaseUpdated()
      })
      .catch(error => {
        console.error("Error parsing JSON:", error);
      })

  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button type="button" size="large" onClick={handleOpen}>
        <EditIcon></EditIcon>
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
          bgcolor: 'background.paper',
          p: 4,
          overflow: 'auto',
          width: '50%',
        }}>
          <h3 className='titleOfForm'>UPDATE DIAMOND CASE</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            style={{ width: '100%' }}
          >
            {({ handleChange, values }) => (
              <Form>
                <div className='row'>
                  <div className='col-12' style={{
                    marginBottom: '20px'
                  }}>
                    <Field
                      name="name"
                      as={TextField}
                      label="Diamond Case"
                      onChange={handleChange}
                      value={values.name}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="name">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                  <div className='col-12' style={{
                    marginBottom: '20px'
                  }}>
                    <Field
                      name="color"
                      as={TextField}
                      label="Color"
                      onChange={handleChange}
                      value={values.color}
                      sx={{ width: '100%' }}
                    />
                    <ErrorMessage name="color">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                  <div className='col-12' style={{
                    marginBottom: '20px'
                  }}>
                    <Field
                      name="material"
                      as={TextField}
                      label="Material"
                      onChange={handleChange}
                      value={values.material}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="material">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                </div> <br />
                <div className='formSubmit' >
                  <Button
                    type="submit"
                    className='submitButton'
                    value="Submit" variant="contained"
                    size="large" endIcon={<SendIcon />}
                    sx={{
                      margin: '5px',
                    }}
                  >
                    Send
                  </Button>
                  <Button type="button"
                    value="Clear" onClick={handleClose}
                    className='submitButton'
                    variant="contained" size="large" color="error"
                    endIcon={<CloseIcon />}
                    sx={{
                      margin: '5px',
                    }}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>


        </Box >
      </Modal>
    </div >
  )
}
