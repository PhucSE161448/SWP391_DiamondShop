import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Alert, Modal } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { createApi } from '../../../Auth/AuthFunction';

export default function UpdateDiamond(props) {
  const [image, setImage] = useState([])
  const [oldImage, setOldImage] = useState([])
  const dataColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const dataClarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
  const dataCut = ["Excellent", "VeryGood", "Good", "Fair", "Poor"].reverse()
  const dataOrigin = ["GIA", "IGI", "AGS", "HRD", "EGL", "CGL"]
  const [open, setOpen] = useState(false)
  const [statusCodeCreate, setStatusCodeCreate] = useState(0)
  const handleOpen = () => {
    setOpen(true)
    addOldImage()
  }

  const handleClose = () => {
    setOpen(false)
    setOldImage([])
    setImage([])
  }

  const addOldImage = () => (
    props.image.map((image) => {
      setOldImage((prevImages) => [...prevImages, image])
    })
  )

  const item = props.item
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

  const ITEM_HEIGHT = 120
  const ITEM_PADDING_TOP = 8
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

  function Update(values) {
    const url = createApi(`Diamond/UpdateDiamond/${props.item.id}`)
    const formData = new FormData()
    formData.append('Origin', values.origin);
    formData.append('Color', values.color);
    formData.append('CaratWeight', values.caratWeight);
    formData.append('Clarity', values.clarity);
    formData.append('Cut', values.cut);
    formData.append('Name', values.name);
    formData.append('Price', values.price);
    formData.append('Quantity', values.quantity);

    for (let i = 0; i < oldImage.length; i++) {
      const fieldName = 'OldImageUrls'
      formData.append(fieldName, oldImage[i].urlPath)
    }

    for (let i = 0; i < image.length; i++) {
      const file = image[i];
      const fieldName = 'DiamondImages';
      const fieldValue = new File([file], `${file.name}`, { type: 'image/jpeg' })
      formData.append(fieldName, fieldValue)
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    }).then(response => {
      setStatusCodeCreate(response.status)
      props.onDiamondUpdated()
      handleClose()
      return response.json();
    })
  }

  const validationSchema = Yup.object({
    origin: Yup.string().required('Origin is required'),
    color: Yup.string().required('Color is required'),
    caratWeight: Yup.number()
      .required('Carat Weight is required')
      .positive('Carat Weight must be positive')
      .min(0.1, 'Carat Weight must be at least 0.1')
      .max(10.2, 'Carat Weight must be 10.2 or less'),
    clarity: Yup.string().required('Clarity is required'),
    cut: Yup.string().required('Cut is required'),
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
  })

  const initialValues = {
    origin: item.origin,
    color: item.color,
    caratWeight: item.caratWeight,
    clarity: item.clarity,
    cut: item.cut,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }
  const onSubmit = (values) => {
    Update(values)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
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
          width: 'auto',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
          width: '50%',
          maxHeight: '80%',
        }}>
          <h3 className='titleOfForm'>UPDATE DIAMOND</h3>
          <div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                style={{ width: '100%' }}
              >
                {({ handleChange, values }) => (
                  <Form>
                    <div className='row'>
                      <div className='col-3'>
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
                      </div>
                      <div className='col-3'>
                        <FormControl fullWidth>
                          <InputLabel>Color</InputLabel>
                          <Field
                            name="color"
                            as={Select}
                            id="color"
                            label="Color"
                            onChange={handleChange}
                            value={values.color}
                            MenuProps={MenuProps}
                          >
                            {dataColors && dataColors.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                      <div className='col-3'>
                        <FormControl fullWidth>
                          <InputLabel>Clarity</InputLabel>
                          <Field
                            name="clarity"
                            as={Select}
                            id="clarity"
                            label="Clarity"
                            onChange={handleChange}
                            value={values.clarity}
                            MenuProps={MenuProps}
                          >
                            {dataClarity && dataClarity.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                      <div className='col-3'>
                        <FormControl fullWidth>
                          <InputLabel>Cut</InputLabel>
                          <Field
                            name="cut"
                            as={Select}
                            id="cut"
                            label="Cut"
                            onChange={handleChange}
                            value={values.cut}
                            MenuProps={MenuProps}
                          >
                            {dataCut && dataCut.map((item, index) => (
                              <MenuItem value={item} key={index}>{item}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                    </div> <br />
                    <div className='row'>
                      <div className='col'>
                        <Field
                          fullWidth
                          name="price"
                          as={TextField}
                          id="price"
                          label="Price"
                          onChange={handleChange}
                          value={values.price}
                          MenuProps={MenuProps}
                        />
                      </div>
                      <div className='col'>
                        <Field
                          fullWidth
                          name="quantity"
                          as={TextField}
                          id="quantity"
                          label="Quantity"
                          onChange={handleChange}
                          value={values.quantity}
                          MenuProps={MenuProps}
                        />
                      </div>
                    </div>
                    <div>
                      {(oldImage.length > 0 || image.length > 0) && (
                        <div>
                          {[...oldImage, ...image].map((image, index) => (
                            <div
                              key={index}
                              style={{
                                display: 'inline-block',
                                margin: '10px',
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}>
                                <img
                                  src={image.urlPath ? image.urlPath : URL.createObjectURL(image)}
                                  alt=""
                                  style={{
                                    width: '150px',
                                    borderRadius: '10px',
                                  }}
                                />
                                <Button
                                  color="error"
                                  onClick={() => {
                                    if (image.urlPath) {
                                      // Xử lý xóa hình ảnh cũ
                                      setOldImage((currentImages) => currentImages.filter((_, i) => i !== index));
                                    } else {
                                      // Xử lý xóa hình ảnh mới
                                      handleDeleteImage(index);
                                    }
                                  }}
                                  sx={{
                                    textAlign: 'right',
                                  }}
                                >
                                  <DeleteIcon sx={{ color: 'red', margin: 0, padding: 0 }} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
                    </div> <br />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }} >
                      <Button
                        type="submit"
                        className='submitButton'
                        value="Submit" variant="contained"
                        sx={{
                          margin: '5px',
                          width: '100px',
                        }}>
                        Send
                      </Button>
                      <Button type="button"
                        value="Clear" onClick={handleClose}
                        className='submitButton'
                        variant="contained" size="large" color="error"
                        sx={{
                          margin: '5px',
                          width: '100px',
                        }}>
                        Close
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Box >
      </Modal>
    </div >
  )
}