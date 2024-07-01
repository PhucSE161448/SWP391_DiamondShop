import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import * as Yup from 'yup';
import { TextField, Button, Alert, Switch } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { createApi } from './AuthFunction'
export default function SignUp() {
  const [responseCode, setResponseCode] = useState(0)
  const [displayStatus, setDisplayStatus] = useState(false)
  const Register = (values) => {
    const url = createApi('Authentication/Register')
    const data = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      password: values.password,
      address: values.address,
      phoneNumber: values.phoneNumber
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        setResponseCode(response.status)
        displayStatus(true)
        return response.json()
      })
      .then(data => {
        console.log('Success:', data)

      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }


  const styleForm = {
    backgroundColor: 'white',
    borderRadius: '50px',
    width: '100%',
    color: 'black',
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

  const FormikMuiTextField = ({ field, form, ...props }) => (
    <TextField
      {...field} // { name, value, onChange, onBlur }
      {...props}
      sx={styleForm} // Using sx prop for styles
    />
  )

  const initialValues = {
    name: '',
    email: '',
    gender: '',
    password: '',
    address: '',
    phoneNumber: ''
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    gender: Yup.boolean().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Invalid phone number')
      .required('Required')
  })

  const onSubmit = (values) => {
    console.log('Form data', values)
    Register(values)

  }

  return (
    <section className='pageLoginContainer'>
      <div className='loginContainer container-fluid'>
        <h1>SIGN UP</h1>
        <div className='row' style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {displayStatus && (
            <>
              {
                String(responseCode).startsWith('2') &&
                <Alert severity="success" variant="filled">Create account successful</Alert>
              }
              {
                !String(responseCode).startsWith('2') &&
                <Alert severity="error" variant="filled">Create account failed</Alert>
              }
            </>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, values, setFieldValue }) => (
              <Form>
                <div className='row col'>
                  <div className='col-4'>
                    <Field
                      as={FormikMuiTextField}
                      fullWidth
                      label="Name"
                      name="name"
                      type="text"
                      variant="outlined"
                      style={styleForm}
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>
                  <div className='col-4'>
                    <Field
                      as={FormikMuiTextField}
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      style={styleForm}
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>
                  <div className='col-4' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '1.5em',
                  }}>
                    <div>
                      Female
                    </div>
                    <Field
                      name="gender"
                      as={Switch}
                      checked={values.gender === true} // "on" for male, "off" for female
                      onChange={handleChange}
                    />
                    <div>
                      Male
                    </div>
                  </div>

                </div> <br />
                <div className='row col'>
                  <div className='col-6'>
                    <Field
                      as={FormikMuiTextField}
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      style={styleForm}
                      onChange={handleChange}
                      value={values.password}
                    />
                  </div>
                  <div className='col-6'>
                    <Field
                      as={FormikMuiTextField}
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                      style={styleForm}
                      onChange={handleChange}
                      value={values.confirmPassword}
                    />
                    <ErrorMessage name="confirmPassword">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                </div> <br />
                <div className='row col'>
                  <div className='col'>
                    <Field
                      as={FormikMuiTextField}
                      fullWidth
                      label="Address"
                      name="address"
                      type="text"
                      variant="outlined"
                      style={styleForm}
                      onChange={handleChange}
                      value={values.address}
                    />
                  </div>
                </div> <br />
                <div className='row col'>
                  <div className='col'>
                    <Field
                      as={FormikMuiTextField}
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      type="text"
                      variant="outlined"
                      style={styleForm}
                      onChange={handleChange}
                      value={values.phoneNumber}
                    />
                    <ErrorMessage name="phoneNumber">
                      {msg => <Alert severity="error">{msg}</Alert>}
                    </ErrorMessage>
                  </div>
                </div>
                <Button
                  type="submit"
                  className='submitButton'
                  value="Submit" variant="contained"
                  size="large" endIcon={<SendIcon />}
                  sx={{
                    margin: '5px',
                    backgroundColor: '#003468',
                    height: '50px',
                    borderRadius: '50px',
                  }}
                >
                  Send
                </Button>
              </Form>

            )}
          </Formik>
        </div>
        <div className='backToHomePageLink' style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          marginRight: '50px',
        }}>
          <Link to="/login" className='linkBackHome' onClick={() => setDisplayStatus(false)}>
            Back to login page
          </Link>
        </div>
      </div>
    </section>
  )
}
