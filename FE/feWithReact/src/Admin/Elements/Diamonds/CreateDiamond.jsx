import React, { useState, useEffect } from 'react'

import * as Yup from 'yup';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Alert, Modal } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import SearchIcon from '@mui/icons-material/Search';

export default function CreateDiamond(props) {
  const [image, setImage] = useState([])
  const [open, setOpen] = useState(false)
  const [dataCertificate, setDataCertificate] = useState(null)
  const dataOrigin = ["GIA", "IGI", "AGS", "HRD", "EGL", "CGL"]
  const [statusCode, setStatusCode] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusCodeCreate, setStatusCodeCreate] = useState(0)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setDataCertificate(null)
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  const ITEM_HEIGHT = 120;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }

  const handleImageChange = (e) => {
    setImage((prevImages) => [...prevImages, ...e.target.files])
  }

  const handleDeleteImage = (index) => {
    setImage((currentImages) => currentImages.filter((_, i) => i !== index))
  }

  async function Create(values) {
    const url = createApi('Diamond/CreateDiamond')

    const formData = new FormData();
    formData.append('CertificateId', values.CertificateId);
    formData.append('Origin', values.Origin);
    formData.append('Color', values.Color);
    formData.append('CaratWeight', values.CaratWeight);
    formData.append('Clarity', values.Clarity);
    formData.append('Cut', values.Cut);
    formData.append('Price', values.Price);
    formData.append('Quantity', values.Quantity);
    // Lặp qua mỗi file và thêm vào FormData
    for (let i = 0; i < image.length; i++) {
      const file = image[i];
      const fieldName = 'DiamondImages';
      const fieldValue = new File([file], `${file.name}`, { type: 'image/jpeg' });
      formData.append(fieldName, fieldValue);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const responseCreateProduct = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    }).then(response => {
      checkApiStatus(response)
      setOpen(false)
      setDataCertificate(null)
      props.onDiamondCreated()
    })
  }

  const getCertificate = (values) => {
    const url = createApi(`Certificate/GetCertificateByOriginAndReportNumberForCreateDiamond/${values.origin}/${values.reportNumber}`)
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => {
        setStatusCode(response.status)
        return response.json()
      })
      .then(responseData => {
        setErrorMessage(responseData.ErrorMessage)
        setDataCertificate(responseData)
      })
      .catch((error) => console.error('Error:', error))
  }

  const validationSchemaGetCert = Yup.object({
    origin: Yup.string().required('Origin is required'),
    reportNumber: Yup.string().required('Report Number is required'),
  });

  const initialValuesGetCert = {
    origin: '',
    reportNumber: '',
  }
  const onSubmitGetCert = (values) => {
    getCertificate(values)
    setDataCertificate(null)
    setErrorMessage(null)
    setStatusCode(null)
  }

  const initialValuesCreateDiamond = {
    CertificateId: '',
    Origin: '',
    Color: '',
    Clarity: '',
    Cut: '',
    CaratWeight: '',
    Price: '',
    Quantity: '',
  }

  const validationSchemaCreateDiamond = Yup.object({
    Quantity: Yup.number().required('Quantity is required'),
    Price: Yup.number().required('Price is required'),
  })

  const onSubmitCreateDiamond = (values) => {
    Create(values)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: '1vw',
      marginTop: '2vh'
    }}>
      <Button variant="contained" type="button" size="large" onClick={handleOpen}>
        CREATE DIAMOND
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
          <h3 className='titleOfForm'>CREATE DIAMOND</h3>
          <div>
            <div>
              <Formik
                initialValues={initialValuesGetCert}
                validationSchema={validationSchemaGetCert}
                onSubmit={onSubmitGetCert}
              >
                {({ handleChange, values, }) =>
                (
                  <Form>
                    <div className='row'>
                      <div className='col'>
                        <FormControl fullWidth>
                          <InputLabel>Origin</InputLabel>
                          <Field
                            name="origin"
                            as={Select}
                            id="origin"
                            label="Origin"
                            onChange={handleChange}
                            value={values.origin}
                            MenuProps={MenuProps}
                          >
                            {dataOrigin && dataOrigin.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                        <ErrorMessage name="origin">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                      <div className='col'>
                        <Field
                          name="reportNumber"
                          as={TextField}
                          label="Report Number"
                          onChange={handleChange}
                          value={values.reportNumber}
                          style={{
                            width: '100%',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                        />
                        <ErrorMessage name="reportNumber">
                          {msg => <Alert severity="error">{msg}</Alert>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className='formSubmit' >
                      <Button
                        type="submit"
                        className='submitButton'
                        value="Submit" variant="contained"
                        size="large"
                        sx={{
                          margin: '5px',
                        }}>
                        Search
                      </Button>
                      <Button type="button"
                        value="Clear" onClick={handleClose}
                        className='submitButton'
                        variant="contained" size="large" color="error"
                        sx={{
                          margin: '5px',
                        }}>
                        CLOSE
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div> <br />
            {statusCode?.toString().startsWith('4') ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
              dataCertificate && (
                <div>
                  <Formik
                    initialValues={initialValuesCreateDiamond}
                    validationSchema={validationSchemaCreateDiamond}
                    onSubmit={onSubmitCreateDiamond}
                  >
                    {({ handleChange, values, setFieldValue }) => {
                      useEffect(() => {
                        setFieldValue('CertificateId', dataCertificate.id)
                        setFieldValue('Origin', dataCertificate.origin)
                        setFieldValue('Color', dataCertificate.color)
                        setFieldValue('Clarity', dataCertificate.clarity)
                        setFieldValue('Cut', dataCertificate.cut)
                        setFieldValue('CaratWeight', dataCertificate.caratWeight)
                      }, [])
                      return (
                        <Form>
                          <div>
                            <div className='row'>
                              <div className='col'>
                                <Field
                                  name="Origin"
                                  as={TextField}
                                  label="Origin"
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </div>
                              <div className='col'>
                                <Field
                                  name="Color"
                                  as={TextField}
                                  label="Color"
                                  onChange={handleChange}
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </div>
                              <div className='col'>
                                <Field
                                  name="Clarity"
                                  as={TextField}
                                  label="Clarity"
                                  onChange={handleChange}
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </div>
                              <div className='col'>
                                <Field
                                  name="Cut"
                                  as={TextField}
                                  label="Cut"
                                  onChange={handleChange}
                                  value={values.Cut}
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </div>
                              <div className='col'>
                                <Field
                                  name="CaratWeight"
                                  as={TextField}
                                  label="CaratWeight"
                                  onChange={handleChange}
                                  value={values.CaratWeight}
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </div>
                            </div> <br />
                            <div className='row'>
                              <div className='col'>
                                <Field
                                  name="Quantity"
                                  as={TextField}
                                  label="Quantity"
                                  onChange={handleChange}
                                  value={values.Quantity}
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}
                                />
                                <ErrorMessage name="Quantity">
                                  {msg => <Alert severity="error">{msg}</Alert>}
                                </ErrorMessage>
                              </div>
                              <div className='col'>
                                <Field
                                  name="Price"
                                  as={TextField}
                                  label="Price"
                                  onChange={handleChange}
                                  value={values.Price}
                                  style={{
                                    width: '100%',
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}
                                />
                                <ErrorMessage name="Price">
                                  {msg => <Alert severity="error">{msg}</Alert>}
                                </ErrorMessage>
                              </div>
                            </div>
                          </div>
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<FileUploadIcon />}
                          >
                            Upload image
                            <VisuallyHiddenInput type="file" multiple onChange={handleImageChange} />
                          </Button>
                          {image.length > 0 && (
                            <Grid container columnSpacing={3}>
                              {image.map((image, index) => (
                                <>
                                  <Grid item xs={3}>
                                    <Card sx={{
                                      width: 'auto',
                                      '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: '10px',
                                      }
                                    }}>
                                      <CardContent>
                                        <img src={URL.createObjectURL(image)} alt="" style={{
                                          width: '100%',
                                          borderRadius: '10px',
                                        }} />
                                        <p key={index}>{image.name}</p>
                                      </CardContent>

                                      <div style={{ textAlign: 'right' }}>
                                        <Button
                                          color="error"
                                          endIcon={<DeleteIcon sx={{ color: 'red', margin: 0, padding: 0 }} />}
                                          onClick={() => handleDeleteImage(index)}>
                                          Delete
                                        </Button>
                                      </div>
                                    </Card>
                                  </Grid >
                                </>
                              ))}
                            </Grid>
                          )}
                          <div className='formSubmit' >
                            <Button
                              type="submit"
                              className='submitButton'
                              value="Submit" variant="contained"
                              sx={{
                                margin: '5px',
                              }}>
                              Save
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
                      )
                    }}

                  </Formik>

                </div>
              )
            )}
          </div>
        </Box >
      </Modal>
    </div >
  )
}