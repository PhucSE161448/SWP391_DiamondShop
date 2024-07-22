import React, { useState } from 'react'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'
import { Modal, Button, Box, TextField, FormControl, Alert } from '@mui/material'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
export default function CreatePromotion(props) {

  function createPromotion(values) {
    const url = createApi('Promotion/CreatePromotion')
    const formData = new FormData()
    formData.append('point', values.point)
    formData.append('discountPercentage', values.discountPercentage)
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
      .then(response => {
        checkApiStatus(response)
        props.onPromotionCreated()
        handleClose()
      })
      .catch((error) => console.error('Error:', error))
  }

  const ITEM_HEIGHT = 120;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const validationSchema = Yup.object({
    point: Yup.number().required('Required').min(1, 'Minimum 1'),
    discountPercentage: Yup.number().required('Required').min(1, 'Minimum 1').max(100, 'Maximum 100'),
  })

  const initialValues = {
    point: '',
    discountPercentage: '',
  }

  const onSubmit = (values) => {
    const formatValues = {
      ...values,
      point: parseInt(values.point),
      discountPercentage: parseFloat(values.discountPercentage)
    }
    createPromotion(formatValues)
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
          overflow: 'auto'
        }}>
          <h3 className='titleOfForm'>CREATE Promotion</h3>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleChange }) => {
                return (
                  <Form>
                    <div>
                      <FormControl fullWidth>
                        <Field
                          name="point"
                          as={TextField}
                          id="point"
                          label="Point"
                          type="number"
                          onChange={handleChange}
                          value={values.point}
                          MenuProps={MenuProps}
                        />
                        <ErrorMessage name="point">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </FormControl>
                    </div> <br />
                    <div>
                      <FormControl fullWidth>
                        <Field
                          name="discountPercentage"
                          as={TextField}
                          id="discountPercentage"
                          label="Discount percentage"
                          type="number"
                          onChange={handleChange}
                          value={values.discountPercentage}
                          MenuProps={MenuProps}
                        />
                        <ErrorMessage name="discountPercentage">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </FormControl>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                          margin: '5px',
                          width: '100px',
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{
                          margin: '5px',
                          width: '100px',
                        }}
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </div>
                  </Form>
                )
              }}

            </Formik>
          </div>

        </Box>
      </Modal>
    </div >
  )
}
