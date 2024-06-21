import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import * as Yup from 'yup'
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Alert, Modal } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'

export default function UpdateProduct(props) {
  const [image, setImage] = useState([])
  const [dataCategory, setDataCategory] = useState(null)
  const [dataDiamond, setDataDiamond] = useState(null)
  const [open, setOpen] = useState(false)
  const [displayStatus, setDisplayStatus] = useState(false)
  const [responseCodeProduct, setResponseCodeProduct] = useState(null)
  const [responseCodeProductDetail, setResponseCodeProductDetail] = useState(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setDisplayStatus(false)
  }
  const item = props.item

  const handleDisplay = () => {
    setDisplayStatus(true)
  }
  useEffect(() => {
    // Define the Read function inside useEffect or make sure it's defined outside and doesn't change
    function Read() {
      const url = 'https://localhost:7122/api/Category/GetAllCategories'
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

  useEffect(() => {
    function getDiamondData() {
      fetch(`https://localhost:7122/api/Diamond/GetPagedDiamonds?QueryDTO.PageSize=1000`)
        .then(response => response.json())
        .then(data => {
          setDataDiamond(data.items)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getDiamondData()
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
    const url = 'https://localhost:7122/api/Product/UpdateProduct/' + item.id
    console.log(values)
    const formData = new FormData()
    formData.append('Name', values.nameProduct)
    formData.append('Gender', values.gender)
    formData.append('Quantity', values.quantity)
    formData.append('CategoryId', values.categoryId)
    formData.append('WarrantyDocumentsId', values.warrantyDocumentsId)


    // Lặp qua mỗi file và thêm vào FormData
    for (let i = 0; i < image.length; i++) {
      const file = image[i]
      const fieldName = 'ProductImages'
      const fieldValue = new File([file], `${file.name}`, { type: 'image/jpeg' })
      formData.append(fieldName, fieldValue)
    }

    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
      },
      body: formData
    }).then(response => {
      setResponseCodeProduct(response.status)
    })

    const urlCreateProductProperties = 'https://localhost:7122/api/Product/UpdateProductProperties/' + item.id
    const productProperties = {
      "createProductPartDtos": values.diamonds,
      "createProductSizeDtos": values.sizes
    }
    fetch(urlCreateProductProperties, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productProperties)
    }).then(response => {
      setResponseCodeProductDetail(response.status)
    }
    )
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
    diamonds: Yup.array().of(
      Yup.object().shape({
        diamondId: Yup.number()
          .required('Size is required')
          .positive('Size must be positive')
          .integer('Size must be an integer'),
        isMain: Yup.bool()
          .required('Type is required'),
      })
    ),
    warrantyDocumentsId: Yup.number()
      .required('Warranty ID is required')
      .positive('Warranty ID must be positive')
      .integer('Warranty ID must be an integer'),
    sizes: Yup.array().of(
      Yup.object().shape({
        size: Yup.number()
          .required('Size is required')
          .positive('Size must be positive')
          .integer('Size must be an integer'),
        price: Yup.number()
          .required('Price is required')
          .positive('Price must be positive')
          .integer('Price must be an integer'),
      })
    ),
  })

  const initialValues = {
    nameProduct: item.name,
    gender: item.gender,
    quantity: item.quantity,
    categoryId: item.category.id,
    warrantyDocumentsId: item.warrantyDocuments.id,
    diamonds: item.productParts.map(partItem => ({
      diamondId: partItem.diamond.id,
      isMain: partItem.isMain,
    })),
    sizes: item.productSizes.map(sizeItem => ({
      size: sizeItem.size,
      price: sizeItem.price,
    })),
  }

  const onSubmit = (values) => {

    const parsedValues = {
      ...values,
      quantity: parseInt(values.quantity, 10),
      warrantyDocumentsId: parseInt(values.warrantyDocumentsId, 10),
      diamonds: values.diamonds ? values.diamonds.map(diamond => ({
        diamondId: parseInt(diamond.diamondId, 10),
        isMain: diamond.isMain
      })) : [],
      sizes: values.sizes ? values.sizes.map(size => ({
        size: parseFloat(size.size),
        price: parseFloat(size.price)
      })) : []
    }
    Update(parsedValues)
    // formik.resetForm()
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button variant="contained" type="button" size="large" onClick={handleOpen}>
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
          width: '-webkit-fill-available',
          bgcolor: 'background.paper',
          p: 4,
          overflow: 'auto',
          height: '100vh',
          width: '100vw',
        }}>
          <h3 className='titleOfForm'>UPDATE PRODUCT</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            style={{ width: '100%' }}
          >
            {({ handleChange, values }) => (
              <Form>
                <div className='row'>
                  <div className='col-12'>
                    <Field
                      name="nameProduct"
                      as={TextField}
                      label="Product Name"
                      onChange={handleChange}
                      value={values.nameProduct}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="nameProduct">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                </div> <br />
                <div className='row'>
                  <div className='col-3'>
                    <Field
                      name="gender"
                      as={RadioGroup}
                      onChange={handleChange}
                      value={values.gender}
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Male" />
                      <FormControlLabel value="false" control={<Radio />} label="Female" />
                    </Field>
                    <ErrorMessage name="gender">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                  <div className='col-3'>
                    <Field
                      name="quantity"
                      as={TextField}
                      label="Quantity"
                      onChange={handleChange}
                      value={values.quantity}
                      sx={{ width: '100%' }}
                    />
                    <ErrorMessage name="quantity">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                  <div className='col-3'>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Field
                        name="categoryId"
                        as={Select}
                        label="Category"
                        id="categoryId"
                        onChange={handleChange}
                        value={values.categoryId}
                        MenuProps={MenuProps}
                      >
                        {dataCategory && dataCategory.map((item) => (
                          <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="categoryId">
                        {msg => <Alert severity="error">{msg}</Alert>}
                      </ErrorMessage>
                    </FormControl>
                  </div>
                  <div className='col-3'>
                    <Field
                      name="warrantyDocumentsId"
                      as={TextField}
                      label="Warranty documents"
                      onChange={handleChange}
                      value={values.warrantyDocumentsId}
                      sx={{ width: '100%' }}
                    />
                    <ErrorMessage name="warrantyDocumentsId">
                      {msg => <Alert severity="error" sx={{ width: '100%' }}>{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                </div> <br />
                <div>
                  <h3>Old images</h3>
                  {item.images.length > 0 && (
                    <div>
                      {item.images.map((image, index) => (
                        <div style={{
                          display: 'inline-block',
                        }}>
                          <img src={image.urlPath} alt="" style={{
                            width: '150px',
                            borderRadius: '10px',
                            margin: '10px',
                          }} />
                          <p key={index}>{image.name}</p>
                        </div>
                      ))}
                    </div>
                  )} <br />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<FileUploadIcon />}
                  >
                    Upload new image
                    <VisuallyHiddenInput type="file" multiple onChange={handleImageChange} />
                  </Button>

                  {image.length > 0 && (
                    <div >
                      <h3>New images</h3>
                      <div>
                        {image.map((image, index) => (
                          <div style={{
                            display: 'inline-block',
                            margin: '10px',
                          }}>
                            <img src={URL.createObjectURL(image)} alt="" style={{
                              width: '150px',
                              borderRadius: '10px',
                            }} />
                            <p key={index}>{image.name}</p>
                            <Button
                              color="error"
                              endIcon={<DeleteIcon sx={{ color: 'red', margin: 0, padding: 0 }} />}
                              onClick={() => handleDeleteImage(index)}
                              sx={{
                                textAlign: 'right'
                              }}>
                              Delete
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div > <br />

                <div className='row' >
                  <div className='col-12'>
                    <FieldArray name="diamonds">
                      {({ push, remove, form }) => (
                        <div>
                          {form.values.diamonds.map((_, index) => (
                            <>
                              <div key={index} className='row' style={{
                                marginBottom: '10px',
                              }}>
                                <div className='col-4'>
                                  <FormControl fullWidth>
                                    <InputLabel>Diamond</InputLabel>
                                    <Field
                                      name={`diamonds[${index}].diamondId`}
                                      as={Select}
                                      label="Diamond"
                                      onChange={form.handleChange}
                                      value={form.values.diamonds[index].diamondId}
                                      MenuProps={MenuProps}
                                    >
                                      {dataDiamond && dataDiamond.map((item) => (
                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                      ))}
                                    </Field>
                                  </FormControl>
                                  <ErrorMessage name={`diamonds[${index}].diamondId`}>
                                    {msg => <Alert severity="error">{msg}</Alert>}
                                  </ErrorMessage>
                                </div>

                                <div className='col-2'>
                                  <Field
                                    name={`diamonds[${index}].isMain`}
                                    as={RadioGroup}
                                    label="isMain"
                                    onChange={form.handleChange}
                                    value={form.values.diamonds[index].isMain}
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      'flex-wrap': 'nowrap'
                                    }}
                                  >
                                    <FormControlLabel value="true" control={<Radio />} label="Main" />
                                    <FormControlLabel value="false" control={<Radio />} label="Extra" />
                                  </Field>
                                  <ErrorMessage name={`diamonds[${index}].isMain`}>
                                    {msg => <Alert severity="error">{msg}</Alert>}
                                  </ErrorMessage>
                                </div><br />
                                <div className='col'>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => remove(index)}
                                    style={{ marginTop: '10px' }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </>
                          ))}
                          <Button
                            variant="contained"
                            onClick={() => push({ diamondId: '', isMain: '' })}
                            style={{ marginTop: '10px' }}
                          >
                            Add Diamond
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div> <br />

                <div className='row'>
                  <div className='col-12'>
                    <FieldArray name="sizes">
                      {({ push, remove, form }) => (
                        <div>
                          {form.values.sizes.map((_, index) => (
                            <>
                              <div key={index} className='row'>
                                <div className='col-4'>
                                  <Field
                                    name={`sizes[${index}].size`}
                                    as={TextField}
                                    label="Size"
                                    onChange={form.handleChange}
                                    value={form.values.sizes[index].size}
                                    style={{ width: '100%' }}
                                  />
                                  <ErrorMessage name={`sizes[${index}].size`}>
                                    {msg => <Alert severity="error">{msg}</Alert>}
                                  </ErrorMessage>
                                </div>

                                <div className='col-4'>
                                  <Field
                                    name={`sizes[${index}].price`}
                                    as={TextField}
                                    label="Price"
                                    onChange={form.handleChange}
                                    value={form.values.sizes[index].price}
                                    style={{ width: '100%' }}
                                  />
                                  <ErrorMessage name={`sizes[${index}].price`}>
                                    {msg => <Alert severity="error">{msg}</Alert>}
                                  </ErrorMessage>
                                </div><br />
                                <div className='col'>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => remove(index)}
                                    style={{ marginTop: '10px' }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div> <br />
                            </>
                          ))}
                          <Button
                            variant="contained"
                            onClick={() => push({ size: '', price: '' })}
                            style={{ marginTop: '10px' }}
                          >
                            Add Size
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </div> <br />
                </div>

                <div className='formSubmit' >
                  <Button
                    type="submit"
                    className='submitButton'
                    value="Submit" variant="contained"
                    size="large" endIcon={<SendIcon />}
                    sx={{
                      margin: '5px',
                    }}
                    onClick={handleDisplay}
                  >
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
              </Form>
            )}
          </Formik>
          {displayStatus && (
            <>
              {
                String(responseCodeProduct).startsWith('2') && String(responseCodeProductDetail).startsWith('2') &&
                <Alert severity="success" variant="filled">Update product successfully</Alert>
              }
              {
                !String(responseCodeProduct).startsWith('2') &&
                <Alert severity="error" variant="filled">Update product failed Update Product</Alert>
              }
              {
                !String(responseCodeProductDetail).startsWith('2') &&
                <Alert severity="error" variant="filled">Update product failed Update Product Properties</Alert>
              }
            </>
          )}
          <Button type="button"
            value="Clear" onClick={handleClose}
            className='submitButton'
            variant="contained" size="large" color="error"
            endIcon={<CloseIcon />}
            sx={{
              margin: '5px',
            }}>
            Close</Button>
        </Box >
      </Modal>
    </div >
  )
}
