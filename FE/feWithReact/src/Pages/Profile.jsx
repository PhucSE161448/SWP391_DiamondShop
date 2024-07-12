import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { createApi } from '../Auth/AuthFunction'
import { Button, TextField, FormControl, InputLabel, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Alert, Select } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
export default function Profile() {
  const userDetail = jwtDecode(localStorage.getItem('token'))
  const [dataUser, setDataUser] = useState(null)
  const [userDetailPage, setUserDetailPage] = useState(true)
  const [userAddressPage, setUserAddressPage] = useState(false)
  const [userAddressEdit, setUserAddressEdit] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup
      .string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    gender: Yup.bool().required('Required'),
  })

  const onSubmit = (values) => {
    updateUser(values)
    // formik.resetForm()
  }
  const initialValues = {
    name: '',
    email: '',
    address: '',
    gender: '',
    phoneNumber: '',
  }

  const handleOpenUserPage = () => {
    setUserDetailPage(true)
    setUserAddressPage(false)
  }

  const handleCloseUserPage = () => {
    setUserDetailPage(false)
  }

  const handleOpenAddressPage = () => {
    setUserAddressPage(true)
    handleCloseUserPage()
  }

  const handleCloseAddressPage = () => {
    setUserAddressPage(false)
    handleOpenUserPage()
  }

  const handleOpenAddressEdit = () => {
    setUserAddressEdit(prev => !prev)
  }

  const id = userDetail.Id
  useEffect(() => {
    const getUserData = (id) => {
      const url = createApi(`Account/GetAccountById/${id}`)
      console.log(url)
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      ).then(response =>
        response.json()
      ).then(responseJson =>
        setDataUser(responseJson)
      )
    }
    getUserData(id)
  }, [id, trigger])

  const updateUser = (values) => {
    const url = createApi(`Account/UpdateUser/${id}`)
    const data = {
      name: values.name,
      address: values.address,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      email: values.email
    }
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json()
    }
    ).then(responseData => {
      console.log(responseData)
      setTrigger(prev => !prev)
    })
  }
  return (
    <div>
      <Container>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h1>
            Profile
          </h1>
        </div>
      </Container>
      <Container>
        <Grid container spacing={2} sx={{
          display: 'flex',
          padding: '10px'
        }}>
          <Grid item xs={12} sm={12} md={3} lg={3} >
            <Container>
              <div>
                <div style={{
                  cursor: 'pointer',
                }} onClick={handleOpenUserPage}>
                  <h3 style={{
                    textDecoration: userDetailPage ? 'underline' : 'none',
                  }}>
                    User Information
                  </h3>
                </div>
                <div>
                  <div style={{
                    cursor: 'pointer',
                  }} onClick={handleOpenAddressPage}>
                    <h3 style={{
                      textDecoration: !userDetailPage ? 'underline' : 'none',
                    }}>
                      Address
                    </h3>
                  </div>
                </div>
              </div>
            </Container>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} >
            {userDetailPage && (
              <Container>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottom: '1px solid #04376a',
                }}>
                  <h2>User Information</h2>
                  <Button onClick={handleOpenAddressEdit} style={{
                    color: '#000',
                  }}>
                    <EditIcon style={{ cursor: 'pointer' }} />
                  </Button>
                </div>
                {!userAddressEdit ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Username: <h5 style={{ margin: '0 0 0 8px' }}>{dataUser?.name}</h5>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Address: <h5 style={{ margin: '0 0 0 8px' }}>{dataUser?.address}</h5>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Phone number: <h5 style={{ margin: '0 0 0 8px' }}>{dataUser?.phoneNumber}</h5>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    marginTop: '20px',
                  }}>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({ handleChange, values, setFieldValue }) => {
                        useEffect(() => {
                          setFieldValue('name', dataUser?.name)
                          setFieldValue('email', dataUser?.email)
                          setFieldValue('address', dataUser?.address)
                          setFieldValue('gender', dataUser?.gender)
                          setFieldValue('phoneNumber', dataUser?.phoneNumber)
                        }, [dataUser])
                        return (
                          <Form>
                            <div className='row'>
                              <div className='col'>
                                <Field
                                  name="name"
                                  as={TextField}
                                  label="Name"
                                  onChange={handleChange}
                                  value={values.name}
                                  style={{ width: '100%' }}
                                />
                                <ErrorMessage name="name">
                                  {msg => <Alert severity="error">{msg}</Alert>}
                                </ErrorMessage>
                              </div>
                              <div className='col'>
                                <Field
                                  name="address"
                                  as={TextField}
                                  label="Address"
                                  onChange={handleChange}
                                  value={values.address}
                                  style={{ width: '100%' }}
                                />
                                <ErrorMessage name="address">
                                  {msg => <Alert severity="error">{msg}</Alert>}
                                </ErrorMessage>
                              </div>
                            </div> <br />
                            <div className='row'>
                              <div className='col'>
                                <Field
                                  name="phoneNumber"
                                  as={TextField}
                                  label="Phone number"
                                  onChange={handleChange}
                                  value={values.phoneNumber}
                                  style={{ width: '100%' }}
                                />
                                <ErrorMessage name="phoneNumber">
                                  {msg => <Alert severity="error">{msg}</Alert>}
                                </ErrorMessage>
                              </div>
                              <div className='col'>
                                <FormControl fullWidth>
                                  <InputLabel>
                                    Gender
                                  </InputLabel>
                                  <Field
                                    name="gender"
                                    as={Select}
                                    label="Gender"
                                    onChange={(event) => {
                                      // Convert the selected value to boolean: true for "Male", false otherwise
                                      const isMale = event.target.value === "Male";
                                      // Use the form's setFieldValue function to update the value
                                      setFieldValue("gender", isMale);
                                    }}
                                    value={values.gender ? "Male" : "Female"} // Assuming `values.gender` is a boolean
                                    style={{ width: '100%' }}
                                  >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                  </Field>
                                </FormControl>
                                <ErrorMessage name="gender">
                                  {msg => <Alert severity="error">{msg}</Alert>}
                                </ErrorMessage>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',

                            }}>
                              <Button
                                size='large'
                                variant="contained"
                                type="submit"
                                sx={{
                                  backgroundColor: '#de8b25',
                                  marginTop: '25px',
                                  color: '#fff',
                                  '&:hover': {
                                    backgroundColor: '#de8b25',
                                    color: '#fff',
                                  }
                                }}
                              >
                                Update
                              </Button>
                            </div>
                          </Form>
                        )
                      }}
                    </Formik>
                  </div>
                )}
                <div>
                  <div style={{
                    margin: '20px auto',
                    width: 'auto',
                  }}>
                    <Button fullWidth onClick={() => navigate('/order')} variant="contained" size="large" sx={{
                      backgroundColor: '#04376a',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#04376a',
                        color: '#fff',
                      }
                    }}>
                      Click here to go to your order
                    </Button>
                  </div>
                </div>
              </Container>
            )}
            {userAddressPage && (
              <Container>


              </Container>
            )}
          </Grid>
        </Grid>
      </Container>
    </div >
  )
}
