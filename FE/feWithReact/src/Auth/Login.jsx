import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextField, Button, FormControl, Alert } from '@mui/material'
import { createApi } from './AuthFunction'
import { jwtDecode } from 'jwt-decode'
import * as Yup from 'yup'
import { GoogleLogin } from '@react-oauth/google';
export default function Login() {
  let navigate = useNavigate()
  const [responseStatus, setResponseStatus] = useState('')
  const [error, setError] = useState('')

  function getToken() {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (token) {
      if (role >= '1' && role <= '4') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
  }

  function validateUser(data) {
    const url = createApi('Authentication/Login/')
    data = {
      email: data.email,
      password: data.password
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            response.json().then(data => {
              setResponseStatus(data.StatusCode);
              setError(data.ErrorMessage);
            });
            return; // Ensure we don't proceed to parse the response again if it's not OK
          }
          return response.json()
        })
        .then(responseJson => {
          console.log(responseJson)
          localStorage.setItem('token', responseJson.accessToken)
          const decodedToken = jwtDecode(responseJson.accessToken)
          localStorage.setItem('role', decodedToken.Role)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function loginByGoogle(token) {
    const url = createApi('Authentication/LoginGoogle')
    const data = {
      googleToken: token
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            response.json().then(data => {
              setResponseStatus(data.StatusCode);
              setError(data.ErrorMessage);
            });
            return; // Ensure we don't proceed to parse the response again if it's not OK
          }
          return response.json()
        })
        .then(responseJson => {
          localStorage.setItem('token', responseJson.accessToken)
          const decodedToken = jwtDecode(responseJson.accessToken)
          localStorage.setItem('role', decodedToken.Role)
          resolve()
          navigate('/')
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  const response = (response) => {
    loginByGoogle(response.credential)
  }

  const styleAlert = {
    borderRadius: '50px',
    width: '100%',
    marginBottom: '5px',
    marginTop: '5px',
    margin: '5px',
  }
  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    validateUser(values)
      .then(() => getToken())
  }

  const styleForm = {
    backgroundColor: 'white',
    borderRadius: '50px',
    width: '100%',
    color: 'black',
    margin: '5px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none', // This ensures the border color is black when focused
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Specifically targeting the focused state for notched outline
      },
    },
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiInputLabel-root': {
      color: 'black',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'black', // Ensuring label text color is black when focused
    },
  }

  return (
    <section className='pageLoginContainer' >
      <div className='loginContainer container-fluid' style={{
        width: '50%',
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h1>LOGIN</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange }) => (
              <Form>
                {
                  responseStatus === 500 && <Alert severity="error" sx={styleAlert}>{error}</Alert>
                }
                {
                  responseStatus.toString().startsWith('4') && <Alert severity="error" sx={styleAlert}>{error}</Alert>
                }
                <FormControl fullWidth>
                  <div className='row'>
                    <div className='col-12'>
                      <Field
                        as={TextField}
                        type="text"
                        name="email"
                        label="Email"
                        onChange={handleChange}
                        sx={styleForm}
                      />
                      <ErrorMessage name="email" >
                        {msg => <Alert severity="error" sx={styleAlert}>{msg}</Alert>}
                      </ErrorMessage>
                    </div>
                    <div className='col-12'>
                      <Field
                        fullWidth
                        as={TextField}
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleChange}
                        sx={styleForm}
                      />
                      <ErrorMessage name="password" >
                        {msg => <Alert severity="error" sx={styleAlert}>{msg}</Alert>}
                      </ErrorMessage>
                    </div>
                  </div>
                </FormControl>

                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}>

                </div>
                <Button type="submit"
                  className='submitButton'
                  value="Submit" variant="contained"
                  size="large"
                  sx={{
                    margin: '5px',
                    backgroundColor: '#003468',
                    height: '50px',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: '#003468',
                    }
                  }}>
                  LOGIN
                </Button>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '5px',
                }}>
                  <Button sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: 'white',
                    }
                  }}>
                    <GoogleLogin
                      clientId="629470625241-289cmgv2sgrusl96bhmhsnpjjbr0m98b.apps.googleusercontent.com"
                      onSuccess={response}
                    />
                  </Button>
                </div>
                <div style={{
                  width: '100%',
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      margin: '5px',
                      height: '50px',
                      backgroundColor: '#ad2a36',
                      color: 'white',
                      width: '100%',
                      borderRadius: '50px',
                      '&:hover': {
                        backgroundColor: '#ad2a36',
                      }
                    }}
                    onClick={() => navigate('/signup')}>
                    SIGN UP
                  </Button>
                </div>

                <div className='backToHomePageLink'>
                  <Link to="/" className='linkBackHome' >
                    Back to homepage
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

    </section >
  )
}

