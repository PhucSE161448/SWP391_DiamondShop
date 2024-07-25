import React, { useState } from 'react'
import { Button, TextField, Modal, Box, Alert, Radio, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'
import EditIcon from '@mui/icons-material/Edit';

export default function UpdateCollection(props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  })

  const initialValues = {
    name: props.name,
  }

  const onSubmit = (values) => {
    Update(values)

  }

  const Update = (values) => {
    const url = createApi(`Collection/UpdateCollection/${props.id}`)
    const data = {
      "name": values.name,
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
        checkApiStatus(response)
        handleClose()
        props.onCollectionUpdated()
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
      <Button onClick={handleOpen}>
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
          width: '30%',
        }}>
          <h3 className='titleOfForm'>UPDATE COLLECTION</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            style={{ width: '100%' }}
          >
            {({ handleChange, values }) => (
              <Form>
                <div className='row'>
                  <div className='col-12'>
                    <Field
                      name="name"
                      as={TextField}
                      label="Name"
                      onChange={handleChange}
                      value={values.name}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="name">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                </div> <br />
                <div className='formSubmit' >
                  <Button
                    type="submit"
                    className='submitButton'
                    value="Submit" variant="contained"
                    size="large"
                    sx={{
                      margin: '5px',
                    }}
                  >
                    save
                  </Button>
                  <Button type="button"
                    value="Clear" onClick={handleClose}
                    className='submitButton'
                    variant="contained" size="large" color="error"
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
