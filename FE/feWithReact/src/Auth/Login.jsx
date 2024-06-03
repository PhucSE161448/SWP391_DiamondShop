import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { useState, useEffect } from 'react';
import { validateUser } from './AuthFucntion';
import { jwtDecode } from 'jwt-decode';
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const submitForm = e => {
    e.preventDefault();

    validateUser({ email: email, password: password }).then(token => {

      if (token) {
        const decodedToken = jwtDecode(token)
        localStorage.setItem('token', token);

        if (decodedToken.Role === '1') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        setError('Invalid username or password. Please try again.');
        setEmail('')
        setPassword('')
        setTimeout(() => {
          navigate('/login');
        }, 0);
      }
    });
  };

  if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'))
    useEffect(() => {
      if (decodedToken.Role === '1') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }, [decodedToken.Role]);

  } else {
    return (
      <section className='pageLoginContainer'>
        <div className='loginContainer container-fluid'>
          <h1>LOGIN TO DASHBOARD</h1>
          {error && <div className="error-message">{error}</div>}
          <div className='loginInputContainer'>
            <form onSubmit={submitForm}>
              <input
                type="text"
                placeholder="Enter your email here"
                className='form-control'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className='form-control'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className='forgotPassword'>
                <Link to="/" className='linkForgotPassword'>
                  Forgot password?
                </Link>
              </div>
              <button className='loginButton'>LOGIN</button>
            </form>
            <Link to="/SignUp" className='signupLink'>
              <button className='signUpButton'>
                SIGN UP
              </button>
            </Link>

            <div className='backToHomePageLink'>
              <Link to="/" className='linkBackHome'>
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
