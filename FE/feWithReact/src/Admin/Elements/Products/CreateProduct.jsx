import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import * as Yup from 'yup';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, AlertTitle, Alert, Modal } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { styled } from '@mui/material/styles'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction';

export default function CreateProduct(props) {
  const [image, setImage] = useState([])
  const [dataCategory, setDataCategory] = useState(null)
  const [dataDiamondCase, setDataDiamondCase] = useState(null)
  const [dataDiamond, setDataDiamond] = useState(null)
  const [dataCollection, setDataCollection] = useState(null)
  const [open, setOpen] = useState(false)
  const [priceMainPart, setPriceMainPart] = useState(0)
  const [priceExtraPart, setPriceExtraPart] = useState(0)
  const [priceWage, setPriceWage] = useState(0)
  const [waiting, setWaiting] = useState(false)

  const calculatePrice = (priceMain, priceExtra, priceSize, priceWage) => {
    return (priceMain + priceExtra + priceSize + priceWage) * 1.2
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setWaiting(false)
    setImage([])
    setPriceExtraPart(0)
    setPriceMainPart(0)
    setPriceWage(0)
  }

  const handleDisplay = () => {
    setWaiting(true)
  }

  useEffect(() => {
    // Define the Read function inside useEffect or make sure it's defined outside and doesn't change
    function getDataCategory() {
      const url = createApi('Category/GetAllCategories')
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
    getDataCategory()
  }, [])

  useEffect(() => {
    function getDiamondData() {
      const url = createApi('Diamond/GetPagedDiamonds?QueryDTO.PageSize=10000')
      fetch(url)
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

  useEffect(() => {
    function getDiamondCaseData() {
      const url = createApi('DiamondCase/GetAllDiamondCases')
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDataDiamondCase(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getDiamondCaseData()
  }, [])

  useEffect(() => {
    function getCollectionData() {
      const url = createApi('Collection/GetAllCollections')
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDataCollection(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getCollectionData()
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
    setImage([])
  }

  const handleDeleteImage = (index) => {
    setImage((currentImages) => currentImages.filter((_, i) => i !== index))
  }


  async function Create(values) {
    const url = createApi('Product/CreateProduct')
    const formData = new FormData();
    formData.append('Name', values.nameProduct);
    formData.append('Gender', values.gender);
    formData.append('Quantity', values.quantity);
    formData.append('CategoryId', values.categoryId);
    formData.append('DiamondCaseId', values.DiamondCaseId);
    formData.append('CollectionId', values.collectionId);
    formData.append('Wage', values.wage);
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    const responseData = await responseCreateProduct.json();

    // Set data and productID after the response is received
    const productID = responseData.id;
    // Use const to define productID for this scope
    const urlCreateProductProperties = createApi(`Product/CreateProductProperties/${productID}`)
    const productProperties = {
      "createProductPartDtos": values.diamonds,
      "createProductSizeDtos": values.sizes
    }
    const response = await fetch(urlCreateProductProperties, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(productProperties)
    }).then(responseData => {
      checkApiStatus(responseData)
      props.onProductCreated()
      handleClose()
      handleClear()
    })

  }
  const validationSchema = Yup.object({
    nameProduct: Yup.string()
      .required('Product name is required'),
    gender: Yup.bool()
      .required('Gender is required'),
    collectionId: Yup.number().required('Collection is required'),
    categoryId: Yup.number()
      .required('Category is required'),
    diamonds: Yup.array().of(
      Yup.object().shape({
        diamondId: Yup.number()
          .required('Diamond is required'),
        isMain: Yup.bool()
          .required('Type is required'),
      })
    ),
    wage: Yup.number().required('Wage is required').positive('Wage must be positive'),
    DiamondCaseId: Yup.number()
      .required('Diamond Case is required'),
    sizes: Yup.array().of(
      Yup.object().shape({
        size: Yup.number()
          .required('Size is required')
          .positive('Size must be positive')
          .integer('Size must be an integer'),
        quantity: Yup.number()
          .required('Quantity is required')
          .positive('Quantity must be positive')
          .integer('Quantity must be an integer'),
      })
    ),
  })

  const initialValues = {
    nameProduct: '',
    gender: '',
    collectionId: '',
    categoryId: '',
    wage: '',
    diamonds: [{ diamondId: '', isMain: true }, { diamondId: '', isMain: false }],
    DiamondCaseId: '',
    sizes: [{ size: '', price: '', quantity: '' }]
  }

  const onSubmit = (values) => {
    const parsedValues = {
      ...values,
      wage: parseInt(values.wage, 10),
      diamonds: values.diamonds ? values.diamonds.map(diamond => ({
        diamondId: parseInt(diamond.diamondId, 10),
        isMain: diamond.isMain
      })) : [],
      sizes: values.sizes ? values.sizes.map(size => ({
        size: parseInt(size.size, 10),
        price: parseInt(size.price, 10),
        quantity: parseInt(size.quantity, 10)
      })) : []
    }
    Create(parsedValues)

  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button variant="contained" type="button" size="large" onClick={handleOpen}>
        CREATE PRODUCT
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
          maxHeight: '70%',
          width: '70%',
        }}>
          <h3 className='titleOfForm'>CREATE PRODUCT</h3>
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
                  <div className='col-2'>
                    <Field
                      name="gender"
                      as={RadioGroup}
                      onChange={handleChange}
                      value={values.gender}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Male" />
                      <FormControlLabel value="false" control={<Radio />} label="Female" />
                    </Field>
                    <ErrorMessage name="gender">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                  <div className='col-3'>
                    <FormControl fullWidth>
                      <InputLabel>Collection</InputLabel>
                      <Field
                        name="collectionId"
                        as={Select}
                        id="collectionId"
                        label="Collection"
                        onChange={handleChange}
                        value={values.collectionId}
                        MenuProps={MenuProps}
                      >
                        {dataCollection && dataCollection.map((item) => (
                          !item.isDeleted && (
                            <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                          )
                        ))}
                      </Field>
                    </FormControl>
                    <ErrorMessage name="collectionId">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                  <div className='col-3'>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Field
                        name="categoryId"
                        as={Select}
                        id="categoryId"
                        label="Category"
                        onChange={handleChange}
                        value={values.categoryId}
                        MenuProps={MenuProps}
                      >
                        {dataCategory && dataCategory.map((item) => (
                          !item.isDeleted && (
                            <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                          )
                        ))}
                      </Field>
                      <ErrorMessage name="categoryId">
                        {msg => <Alert severity="error">{msg}</Alert>}
                      </ErrorMessage>
                    </FormControl>
                  </div>
                  <div className='col-2'>
                    <FormControl fullWidth>
                      <InputLabel>Diamond Case</InputLabel>
                      <Field
                        name="DiamondCaseId"
                        as={Select}
                        label="Diamond Case"
                        onChange={handleChange}
                        value={values.DiamondCaseId}
                      >
                        {dataDiamondCase && dataDiamondCase.map((item) => (
                          !item.isDeleted && (
                            <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                          )
                        ))}
                      </Field>
                    </FormControl>
                    <ErrorMessage name="DiamondCaseId">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                  <div className='col-2'>
                    <Field
                      name="wage"
                      as={TextField}
                      label="Wage"
                      onChange={(e) => {
                        handleChange(e)
                        setPriceWage(e.target.value)
                      }}
                      value={values.wage}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="wage">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
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
                            onClick={() => handleDeleteImage(index)}>
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div > <br />
                <div className='row'>
                  <div className='col-6'>
                    <FieldArray name="diamonds">
                      {({ form }) => (
                        <div>
                          <div className='row'>
                            <div className='col'>
                              <FormControl fullWidth>
                                <InputLabel>Diamond</InputLabel>
                                <Field
                                  name={`diamonds[0].diamondId`}
                                  as={Select}
                                  label="Diamond"
                                  onChange={form.handleChange}
                                  value={form.values.diamonds[0].diamondId}
                                  MenuProps={MenuProps}
                                >
                                  {dataDiamond && dataDiamond.map((item) => (
                                    !item.isDeleted && (
                                      <MenuItem
                                        value={item.id}
                                        key={item.id}
                                        onClick={() => { setPriceMainPart(item.price) }}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    )
                                  ))}
                                </Field>
                              </FormControl>
                              <ErrorMessage name={`diamonds[0].diamondId`}>
                                {msg => <Alert severity="error">{msg}</Alert>}
                              </ErrorMessage>
                            </div>

                            <div className='col-4'>
                              <Field
                                name={`diamonds[0].isMain`}
                                as={RadioGroup}
                                label="isMain"
                                onChange={form.handleChange}
                                value={form.values.diamonds[0].isMain}
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                                readOnly={true}
                              >
                                <FormControlLabel value="true" control={<Radio />} label="Main" />
                                <FormControlLabel value="false" control={<Radio />} label="Extra" />
                              </Field>
                              <ErrorMessage name={`diamonds[0].isMain`}>
                                {msg => <Alert severity="error">{msg}</Alert>}
                              </ErrorMessage>
                            </div><br />
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div> <br />
                  <div className='col-6'>
                    <FieldArray name="diamonds">
                      {({ form }) => (
                        <div>
                          <div className='row'>
                            <div className='col'>
                              <FormControl fullWidth>
                                <InputLabel>Diamond</InputLabel>
                                <Field
                                  name={`diamonds[1].diamondId`}
                                  as={Select}
                                  label="Diamond"
                                  onChange={form.handleChange}
                                  value={form.values.diamonds[1].diamondId}
                                  MenuProps={MenuProps}
                                >
                                  {dataDiamond && dataDiamond.map((item) => (
                                    !item.isDeleted && (
                                      <MenuItem
                                        value={item.id}
                                        key={item.id}
                                        onClick={() => { setPriceExtraPart(item.price) }}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    )
                                  ))}

                                </Field>
                              </FormControl>
                              <ErrorMessage name={`diamonds[1].diamondId`}>
                                {msg => <Alert severity="error">{msg}</Alert>}
                              </ErrorMessage>
                            </div>

                            <div className='col-4'>
                              <Field
                                name={`diamonds[1].isMain`}
                                as={RadioGroup}
                                label="isMain"
                                onChange={form.handleChange}
                                value={form.values.diamonds[1].isMain}
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                                readOnly={true}
                              >
                                <FormControlLabel value="true" control={<Radio />} label="Main" />
                                <FormControlLabel value="false" control={<Radio />} label="Extra" />
                              </Field>
                              <ErrorMessage name={`diamonds[1].isMain`}>
                                {msg => <Alert severity="error">{msg}</Alert>}
                              </ErrorMessage>
                            </div><br />
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div> <br />
                </div> <br />
                <div className='row'>
                  <div className='col-12'>
                    <FieldArray name="sizes">
                      {({ push, remove, form }) => (
                        <div>
                          {form.values.sizes.map((_, index) => (
                            <div key={index} className='row' style={{
                              marginBottom: '10px'
                            }}>
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
                                  value={form.values.sizes[index].price = calculatePrice(priceMainPart, priceExtraPart, form.values.sizes[index].size * 100, Number(priceWage))}
                                  style={{ width: '100%' }}
                                  onChange={form.handleChange}
                                  readOnly={true}
                                />
                              </div><br />
                              <div className='col-2'>
                                <FormControl fullWidth>
                                  <Field
                                    name={`sizes[${index}].quantity`}
                                    as={TextField}
                                    label="Quantity"
                                    onChange={form.handleChange}
                                    value={form.values.sizes[index].quantity}

                                  />
                                </FormControl>
                                <ErrorMessage name={`sizes[${index}].quantity`}>
                                  {msg => <Alert severity="error">{msg}</Alert>}
                                </ErrorMessage>
                              </div>
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
                          ))}
                          <Button
                            variant="contained"
                            onClick={() => push({ size: '', price: '', quantity: '' })}
                            style={{ marginTop: '10px' }}
                          >
                            Add Size
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                <div>
                  {waiting && (
                    <Alert severity="info"><AlertTitle>Please Wait</AlertTitle></Alert>
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
                    }}
                    onClick={handleDisplay}
                  >
                    Add
                  </Button>
                  <Button type="button"
                    value="Clear" onClick={handleClose}
                    className='submitButton'
                    variant="contained" size="large" color="error"
                    endIcon={<CloseIcon />}
                    sx={{
                      margin: '5px',
                    }}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>


        </Box >
      </Modal>

    </div >
  )
}
