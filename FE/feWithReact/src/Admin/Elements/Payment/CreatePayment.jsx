import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import Modal from '@mui/material/Modal'
import { createApi } from '../../../Auth/AuthFunction'
export default function CreatePayment(props) {
  const [responseStatus, setResponseStatus] = useState(null)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setResponseStatus(null)
  }

  const validationSchema = Yup.object({
    namePayment: Yup.string().required('Required'),
  })

  const initialValues = {
    namePayment: '',
  }

  const onSubmit = (values) => {
    Create(values)
    // formik.resetForm()
  }


  function Create(Values) {
    const url = createApi('Payment/Create')
    const data = {
      name: Values.namePayment,
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
        props.onPaymentCreated()
        handleClose()
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
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
          height: '100vh',
          width: '50%',
          overflow: 'auto'
        }}>
          <h3 className='titleOfForm'>CREATE PAYMENT</h3>
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
                        name="namePayment"
                        as={TextField}
                        label="Payment"
                        onChange={handleChange}
                        value={values.namePayment}
                        style={{ width: '100%' }}
                      />
                      <ErrorMessage name="namePayment">
                        {msg => <Alert severity="error">{msg}</Alert>}
                      </ErrorMessage>
                    </div>
                    <div className='formSubmit'>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                        type="submit"
                        sx={{
                          margin: '5px'
                        }}
                      >
                        Send
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{
                          margin: '5px'
                        }}
                        onClick={handleClose}
                      >
                        Cancel
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
