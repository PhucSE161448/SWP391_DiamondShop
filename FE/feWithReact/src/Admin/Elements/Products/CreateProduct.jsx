import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CreateProduct(props) {
  const [nameProduct, setnameProduct] = useState('')
  const [gender, setGender] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [warrantyDocumentsId, setWarrantyDocumentsId] = useState(null)
  const [responseStatus, setResponseStatus] = useState(null)
  const [image, setImage] = useState([])
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(true)

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

  const handleImageChange = (e) => {
    setImage((prevImages) => [...prevImages, ...e.target.files])
  }
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setnameProduct('')
    setData(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    Create(event)
  }

  const handleClear = () => {
    setnameProduct('')
    setGender(null)
    setQuantity('')
    setCategoryId('')
    setWarrantyDocumentsId('')
    setImage([])
    setData(null)
  }

  const handleDeleteImage = (index) => {
    setImage((currentImages) => currentImages.filter((_, i) => i !== index))
  }

  function Create(event) {
    event.preventDefault()
    const url = 'https://localhost:7054/api/Product/CreateProduct'
    const formData = new FormData();

    // Thêm các trường dữ liệu khác
    formData.append('Name', nameProduct);
    formData.append('Gender', gender);
    formData.append('Quantity', quantity);
    formData.append('CategoryId', categoryId);
    formData.append('WarrantyDocumentsId', warrantyDocumentsId);


    // Lặp qua mỗi file và thêm vào FormData
    for (let i = 0; i < image.length; i++) {
      const file = image[i];
      const fieldName = 'ProductImages';
      const fieldValue = new File([file], `${file.name}`, { type: 'image/jpeg' });
      formData.append(fieldName, fieldValue);
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
      },
      body: formData
    }).then(response => {
      setResponseStatus(response.status) // Assuming the response is JSON
    })
      .then(responseData => {
        setData(responseData)
      })
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'red'
    }}>
      {/* <Button variant="contained" type="button" size="large" onClick={handleOpen}>
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <h3 className='titleOfForm'>CREATE PRODUCT</h3>
        <div>
          <form onSubmit={handleSubmit} >
            <div className='row'>
              <div className='col'>
                <TextField type="text" value={nameProduct}
                  onChange={e => setnameProduct(e.target.value)} id="outlined-basic" label="Name" variant="outlined" className='form-control' />
              </div>
            </div> <br />
            <div className='row'>
              <div className='col-3'>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Gender</InputLabel>
                  <Select labelId="select-label"
                    id="demo-simple-select" variant="outlined"
                    label="Gender" value={gender}
                    onChange={e => setGender(e.target.value === "true")} className='form-control'
                    sx={{
                      padding: '0'
                    }}>
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='col-3'>
                <TextField type="text" value={quantity}
                  onChange={e => setQuantity(e.target.value)} id="outlined-basic" label="Quantity" variant="outlined" className='form-control' />
              </div>
              <div className='col-3'>
                <TextField type="text" value={categoryId}
                  onChange={e => setCategoryId(e.target.value)} id="outlined-basic" label="Category ID" variant="outlined" className='form-control' />
              </div>
              <div className='col-3'>
                <TextField type="text" value={warrantyDocumentsId}
                  onChange={e => setWarrantyDocumentsId(e.target.value)} id="outlined-basic" label="Warranty documents" variant="outlined" className='form-control' />
              </div>
            </div> <br />

            <div>
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
            </div>
            <div className='formSubmit' >
              <Button
                type="submit"
                className='submitButton'
                value="Submit" variant="contained"
                size="large" endIcon={<SendIcon />}
                sx={{
                  margin: '5px',
                }}>
                Send
              </Button>
              <Button type="button"
                value="Clear" onClick={handleClear}
                className='submitButton'
                variant="contained" size="large" color="error"
                endIcon={<CancelScheduleSendIcon />}
                sx={{
                  margin: '5px',
                }}>
                Clear
              </Button>
            </div>
          </form>
        </div>
      </Box >
      {/* </Modal > */}
    </div >
  )
}
