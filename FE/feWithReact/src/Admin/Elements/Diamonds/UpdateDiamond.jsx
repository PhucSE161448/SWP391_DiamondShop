import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Alert, Modal } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { createApi } from '../../../Auth/AuthFunction';

export default function UpdateDiamond(props) {
  const [image, setImage] = useState([])
  const [open, setOpen] = useState(false)
  const dataColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const dataClarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"]
  const dataCut = ["Excellent", "Very Good", "Good", "Fair", "Poor"].reverse()
  const [statusCodeCreate, setStatusCodeCreate] = useState(0)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)

  }
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

  const handleClear = () => {
    formik.resetForm()
    setImage([])
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


    // Lặp qua mỗi file và thêm vào FormData
    for (let i = 0; i < image.length; i++) {
      const file = image[i];
      const fieldName = 'ProductImages';
      const fieldValue = new File([file], `${file.name}`, { type: 'image/jpeg' })
      console.log(fieldName, fieldValue)
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
      <Button variant="contained" type="button" size="large" color='warning' onClick={handleOpen}>
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
          width: 'auto',
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <h3 className='titleOfForm'>UPDATE DIAMOND</h3>
          <div>
            <div>
              <h3>
                Old images
              </h3>
              {props.image.length > 0 && (
                <Grid container columnSpacing={3}>
                  {props.image.map((image, index) => (
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
                            <img src={image.urlPath} alt="" style={{
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
              <></>
              <h3>
                New images
              </h3>
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
                  {
                    image.map((image, index) => (
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
                    ))
                  }
                </Grid>
              )}
            </div> <br />
            {statusCodeCreate?.toString().startsWith('4') ? (
              <Alert severity="error">Create Diamond failed</Alert>
            ) : (
              statusCodeCreate?.toString().startsWith('2') && (
                <Alert severity="success">Create Diamond successfully</Alert>
              )
            )}
          </div>
        </Box >
      </Modal>
    </div >
  )
}