import { Button, Box, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import UpdateIcon from '@mui/icons-material/Update'
import SendIcon from '@mui/icons-material/Send'
import React, { useEffect, useState } from 'react'
import { createApi } from '../../../Auth/AuthFunction'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'

export default function UpdateType(props) {
  const [open, setOpen] = useState(false)
  const data = props.data
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  function UpdateType(values) {
    const url = createApi(`Group/UpdateGroup/${props.data.id}`)
    const Data = {
      "name": values.nameType,
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
      .then(response => response.json())
    props.onUpdateType()
  }


  const validationSchema = Yup.object({
    nameType: Yup.string().required('Required'),
  })

  const initialValues = {
    nameType: data.name,
  }

  const onSubmit = (values) => {
    console.log(values)
    UpdateType(values)
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
          <h3 className='titleOfForm'>UPDATE Type</h3>
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
        </Box>
      </Modal>
    </div>
  )
}
