import { Button, Box, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { createApi, checkApiStatus } from '../../../Auth/AuthFunction'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import EditIcon from '@mui/icons-material/Edit';
export default function UpdatePayment(props) {
  const [open, setOpen] = useState(false)
  const data = props.data
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  function UpdatePayment(values) {
    const url = createApi(`Payment/Update/${props.data.id}`)
    const Data = {
      "name": values.namePayment,
      "isDeleted": false,
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
      .then(response => {
        checkApiStatus(response)
        props.onUpdatePayment()
        handleClose()
      })
  }

  const validationSchema = Yup.object({
    namePayment: Yup.string().required('Required'),
  })

  const initialValues = {
    namePayment: data.name,
  }

  const onSubmit = (values) => {
    UpdatePayment(values)
  }

  return (
    <div>
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
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
          width: '30%',
          overflow: 'auto'

        }}>
          <h3 className='titleOfForm'>UPDATE PAYMENT</h3>
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
                    <div className='col'>
                      <Field
                        name="namePayment"
                        as={TextField}
                        label="Name Payment"
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
