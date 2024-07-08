import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import Modal from '@mui/material/Modal'
import { createApi } from '../../../Auth/AuthFunction'
export default function CreateType(props) {
  const [responseStatus, setResponseStatus] = useState(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setResponseStatus(null)
  }

  const validationSchema = Yup.object({
    nameType: Yup.string().required('Required'),
  })

  const initialValues = {
    nameType: '',
  }

  const onSubmit = (values) => {
    Create(values)
    // formik.resetForm()
  }


  function Create(Values) {
    const url = createApi('Group/CreateGroup')
    const data = {
      name: Values.nameType,
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        setResponseStatus(response.status)
        return response.json()
      })
      .then(responseData => {
        props.onTypeCreated()
      })
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <Button variant="contained" type="button" size="large" onClick={handleOpen}>
        Create
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
          alignContent: 'center'
        }}>
          <h3 className='titleOfForm'>CREATE TYPE</h3>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ handleChange, values }) => (
                <Form>
                  <div className='row'>
                    <div className='col'>
                      <Field
                        name="nameType"
                        as={TextField}
                        label="Name type"
                        onChange={handleChange}
                        value={values.nameType}
                        style={{ width: '100%' }}
                      />
                      <ErrorMessage name="nameType">
                        {msg => <Alert severity="error">{msg}</Alert>}
                      </ErrorMessage>
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
          <div>
            {responseStatus && (responseStatus.toString().startsWith('2')
              ? <div>Create success</div>
              : <div>Create failed</div>)}
          </div>
        </Box>
      </Modal>
    </div>
  )
}
