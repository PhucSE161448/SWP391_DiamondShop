import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CreateProduct(props) {
  const [image, setImage] = useState([])
  const [dataCategory, setDataCategory] = useState(null)
  useEffect(() => {
    // Define the Read function inside useEffect or make sure it's defined outside and doesn't change
    function Read() {
      const url = 'https://localhost:7122/api/Category/GetAllCategories';
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*'
        },
      })
        .then(response => response.json())
        .then(responseData => {
          setDataCategory(responseData)
        })
        .catch((error) => console.error('Error:', error))
    }
    Read()
  }, [])


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

  const handleClear = () => {
    formik.resetForm()
    setImage([])
  }

  const handleDeleteImage = (index) => {
    setImage((currentImages) => currentImages.filter((_, i) => i !== index))
  }

  async function Create(values) {
    const url = 'https://localhost:7122/api/Product/CreateProduct'

    const formData = new FormData();
    formData.append('Name', values.nameProduct);
    formData.append('Gender', values.gender);
    formData.append('Quantity', values.quantity);
    formData.append('CategoryId', values.categoryId);
    formData.append('WarrantyDocumentsId', values.warrantyDocumentsId);


    // Lặp qua mỗi file và thêm vào FormData
    for (let i = 0; i < image.length; i++) {
      const file = image[i];
      const fieldName = 'ProductImages';
      const fieldValue = new File([file], `${file.name}`, { type: 'image/jpeg' });
      formData.append(fieldName, fieldValue);
    }

    const responseCreateProduct = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
      },
      body: formData
    });
    const responseData = await responseCreateProduct.json();

    // Set data and productID after the response is received
    const productID = responseData.id;
    // Use const to define productID for this scope
    const urlCreateProductProperties = 'https://localhost:7122/api/Product/CreateProductProperties/' + productID
    const productProperties = {
      "createProductPartDtos": [
        {
          "isMain": true,
          "diamondId": values.diamondIdMain
        },
        {
          "isMain": false,
          "diamondId": values.diamondIdExtra
        }
      ],
      "createProductSizeDtos": [
        {
          "size": values.size,
          "price": values.price
        }
      ]
    }
    const response = await fetch(urlCreateProductProperties, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productProperties)
    })

  }
  const validationSchema = Yup.object({
    nameProduct: Yup.string()
      .required('Product name is required'),
    gender: Yup.bool()
      .required('Gender is required'),
    quantity: Yup.number('Input must be number')
      .required('Quantity is required')
      .positive('Number must not negative')
      .integer('Number must be an integer'),
    categoryId: Yup.number()
      .required('Category is required'),
    diamondIdMain: Yup.number()
      .required('Diamond ID is required')
      .positive('Diamond ID must be positive')
      .integer('Diamond ID must be an integer'),
    diamondIdExtra: Yup.number()
      .required('Diamond ID is required')
      .positive('Diamond ID must be positive')
      .integer('Diamond ID must be an integer'),
    warrantyDocumentsId: Yup.number()
      .required('Diamond ID is required')
      .positive('Diamond ID must be positive')
      .integer('Diamond ID must be an integer'),
    size: Yup.number()
      .required('Size is required')
      .positive('Size must be positive'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive'),
    // Add other fields as needed
  })

  const formik = useFormik({
    initialValues: {
      nameProduct: '',
      gender: '',
      quantity: '',
      categoryId: '',
      warrantyDocumentsId: '',
      diamondIdMain: '',
      diamondIdExtra: '',
      size: '',
      price: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const parsedValues = {
        ...values,
        quantity: parseInt(values.quantity, 10),
        warrantyDocumentsId: parseInt(values.warrantyDocumentsId, 10),
        diamondIdMain: parseInt(values.diamondIdMain, 10),
        diamondIdExtra: parseInt(values.diamondIdExtra, 10),
        size: parseFloat(values.size),
        price: parseFloat(values.price),
      };
      console.log(JSON.stringify(parsedValues, null, 2))
      Create(parsedValues)
      formik.resetForm()
    },
  })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'red'
    }}>
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
        <h3 className='titleOfForm'>CREATE PRODUCT</h3>
        <div>
          <form onSubmit={formik.handleSubmit} >
            <div className='row'>
              <div className='col'>
                <TextField type="text" value={formik.values.nameProduct}
                  onChange={formik.handleChange}
                  name="nameProduct"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className='form-control' />
                {formik.touched.nameProduct && formik.errors.nameProduct &&
                  (<Alert severity="error">{formik.errors.nameProduct}</Alert>)}
              </div>
            </div> <br />
            <div className='row'>
              <div className='col-3'>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Gender</InputLabel>
                  <Select labelId="select-label" name='gender'
                    id="demo-simple-select" variant="outlined"
                    label="Gender" value={formik.values.gender}
                    onChange={formik.handleChange} className='form-control'
                    sx={{
                      padding: '0'
                    }}>
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.gender && formik.errors.gender &&
                  (<Alert severity="error">{formik.errors.gender}</Alert>)}
              </div>
              <div className='col-3'>
                <TextField type="text" value={formik.values.quantity}
                  onChange={formik.handleChange}
                  name='quantity' id="outlined-basic"
                  label="Quantity" variant="outlined"
                  className='form-control' />
                {formik.touched.quantity && formik.errors.quantity &&
                  (<Alert severity="error">{formik.errors.quantity}</Alert>)}
              </div>
              <div className='col-3'>
                <FormControl sx={{
                  width: '100%' // Style to make the select box full width
                }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    name='categoryId'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.categoryId}
                    label="Category" // Corrected label to match the context
                    onChange={formik.handleChange} // Update state on change
                    MenuProps={MenuProps} // Update state on change
                  >
                    {dataCategory && dataCategory.map((item) => (
                      <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem> // Map each category to a MenuItem
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.categoryId && formik.errors.categoryId &&
                  (<Alert severity="error">{formik.errors.categoryId}</Alert>)}
              </div>
              <div className='col-3'>
                <TextField type="text" name='warrantyDocumentsId'
                  value={formik.values.warrantyDocumentsId}
                  onChange={formik.handleChange}
                  id="outlined-basic" label="Warranty documents"
                  variant="outlined" className='form-control' />
                {formik.touched.warrantyDocumentsId && formik.errors.warrantyDocumentsId &&
                  (<Alert severity="error">{formik.errors.warrantyDocumentsId}</Alert>)}
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
            </div> <br />
            <div className='row'>
              <div className='col-6'>
                <TextField type="text" name='diamondIdMain'
                  value={formik.values.diamondIdMain}
                  onChange={formik.handleChange}
                  id="outlined-basic" label="Diamond ID Main"
                  variant="outlined" className='form-control' />
                {formik.touched.diamondIdMain && formik.errors.diamondIdMain &&
                  (<Alert severity="error">{formik.errors.diamondIdMain}</Alert>)}
              </div>
              <div className='col-6'>
                <TextField type="text" name='diamondIdExtra'
                  value={formik.values.diamondIdExtra}
                  onChange={formik.handleChange}
                  id="outlined-basic" label="Diamond ID Extra"
                  variant="outlined" className='form-control' />
                {formik.touched.diamondIdExtra && formik.errors.diamondIdExtra &&
                  (<Alert severity="error">{formik.errors.diamondIdExtra}</Alert>)}
              </div>
            </div> <br />
            <div className='row'>
              <div className='col-6'>
                <TextField type="text" name='size'
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  id="outlined-basic" label="Size"
                  variant="outlined" className='form-control' />
                {formik.touched.size && formik.errors.size &&
                  (<Alert severity="error">{formik.errors.size}</Alert>)}
              </div>
              <div className='col-6'>
                <TextField type="text" name='price'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  id="outlined-basic" label="Price"
                  variant="outlined" className='form-control' />
                {formik.touched.price && formik.errors.price &&
                  (<Alert severity="error">{formik.errors.price}</Alert>)}
              </div>
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
    </div >
  )
}
