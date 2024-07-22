import { Button, Box, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import UpdateIcon from '@mui/icons-material/Update'
import SendIcon from '@mui/icons-material/Send'
import React, { useEffect, useState } from 'react'
import { createApi, checkApiStatus } from '../../../Auth/AuthFunction'
import EditIcon from '@mui/icons-material/Edit'
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
      'groupId': 1
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
      .then(response => checkApiStatus(response))
      .then(() => {
        props.onUpdateCategory()
        handleClose()
      })
  }


  const validationSchema = Yup.object({
    nameCategory: Yup.string().required('Required'),
  })

  const initialValues = {
    nameCategory: data.name,
  }

  const onSubmit = (values) => {
    const parsedValues = {
      ...values,
    }
    UpdateCategory(parsedValues)
    // formik.resetForm()
  }

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
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
          overflow: 'auto',
          width: '50%',
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
                    <div className='col'>
                      <TextField
                        id="nameCategory"
                        name="nameCategory"
                        label="Name"
                        value={values.nameCategory}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                      />
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
