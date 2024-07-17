import React, { useEffect, useState } from 'react'
import { createApi } from '../../../Auth/AuthFunction'
import { Modal, Button, Box, TextField, FormControl, Select, InputLabel, MenuItem, Switch, FormControlLabel, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);
dayjs.extend(utc)
dayjs.extend(timezone)

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
export default function CreateVoucher(props) {

  const [productData, setProductData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)

  function createVoucher(values) {
    const url = createApi('Voucher/CreateVoucher')
    const data = values
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
        props.onVoucherCreated()
        handleClose()
      })
      .catch((error) => console.error('Error:', error))
  }
  useEffect(() => {
    const url = createApi('Product/GetPagedProducts?queryDTO.PageSize=10000')
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setProductData(responseData.items)
      })
      .catch((error) => console.error('Error:', error))
  }, [triggerRead])

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
    isAllProduct: Yup.bool().required('Required'),
    discountPercentage: Yup.number().required('Required').min(1, 'Minimum 1').max(100, 'Maximum 100'),
    startDate: Yup.date()
      .required('Required')
      .test(
        'is-greater-than-today',
        'Start day must be today or later',
        value => dayjs(value).startOf('day').isSameOrAfter(dayjs().startOf('day'))
      ),
    endDate: Yup.date()
      .required('Required')
      .test(
        'is-after-start-date',
        'End date must be greater than or equal to start date',
        function (value) {
          const { startDate } = this.parent;
          return dayjs(value).isSameOrAfter(dayjs(startDate), 'day');
        }
      )
  })

  const initialValues = {
    productId: '',
    isAllProduct: false,
    discountPercentage: '',
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  }

  const onSubmit = (values) => {
    const formatValues = {
      ...values,
      startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
    }
    createVoucher(formatValues)

  }

  function customHandleChangeForProduct(event, setFieldValue) {
    const { name, value, checked, type } = event.target;

    if (name === "isAllProduct") {
      if (checked) {
        setFieldValue("productId", '');
      }
      setFieldValue(name, checked);
    } else {
      const finalValue = type === "checkbox" ? checked : value;
      setFieldValue(name, finalValue);
    }
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
          <h3 className='titleOfForm'>CREATE VOUCHER</h3>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ setFieldValue, values, handleChange }) => {
                const handleStartDateChange = (newValue) => {
                  setFieldValue('startDate', dayjs(newValue));
                }
                const handleEndDateChange = (newValue) => {
                  setFieldValue('endDate', dayjs(newValue));
                }
                return (
                  <Form>
                    <div className='row'>
                      <div className='col'>
                        <FormControl fullWidth>
                          <FormControlLabel
                            control={
                              <Field
                                type="checkbox"
                                name="isAllProduct"
                                as={Switch}
                                id="isAllProduct"
                                onChange={(event) => customHandleChangeForProduct(event, setFieldValue)}
                                checked={values.isAllProduct}
                              />
                            }
                            label="Include All Products"
                          />
                        </FormControl>
                      </div>
                      {!values.isAllProduct && (<div className='col'>
                        <FormControl fullWidth>
                          <InputLabel>Product Name</InputLabel>
                          <Field
                            name="productId"
                            as={Select}
                            id="productId"
                            label="Product name"
                            onChange={(event) => customHandleChangeForProduct(event, setFieldValue)}
                            value={values.productId}
                            MenuProps={MenuProps}
                            disabled={values.isAllProduct}
                          >
                            {productData && productData.map((item, index) => (
                              !item.isDeleted && <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>)}

                    </div> <br />
                    <div className='row'>
                      <div className='col'>
                        <FormControl fullWidth>
                          <Field
                            name="discountPercentage"
                            as={TextField}
                            id="discountPercentage"
                            label="Discount percentage"
                            onChange={handleChange}
                            value={values.discountPercentage}
                            MenuProps={MenuProps}
                          />
                          <ErrorMessage name="discountPercentage">
                            {msg => <Alert severity="error">{msg}</Alert>}
                          </ErrorMessage>
                        </FormControl>
                      </div>
                      <div className='col'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker sx={{
                            width: '100%',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                            label="Start Date"
                            value={dayjs(values.startDate)}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        <ErrorMessage name="startDate">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                      <div className='col'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker sx={{
                            width: '100%',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                            label="End Date"
                            value={dayjs(values.endDate)}
                            onChange={handleEndDateChange}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        <ErrorMessage name="endDate">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
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
