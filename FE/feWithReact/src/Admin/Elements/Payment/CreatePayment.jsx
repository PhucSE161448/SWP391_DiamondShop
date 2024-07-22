import React, { useState, } from 'react'
import { TextField, Button, Box, Alert } from '@mui/material'
import { Form, Formik, Field, ErrorMessage, } from 'formik'
import * as Yup from 'yup'
import Modal from '@mui/material/Modal'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'
export default function CreatePayment(props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
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
        checkApiStatus(response)
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
                        type="submit"
                        sx={{
                          margin: '5px'
                        }}
                      >
                        save
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
        </Box>
      </Modal>
    </div>
  )
}
