import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { useState } from 'react';
import { validateUser } from './CheckData';
export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const submitForm = e => {
    e.preventDefault();

    validateUser({ username: username, password: password }).then(user => {
      console.log(user);
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        setError('Invalid username or password. Please try again.');
        setUsername('')
        setPassword('')
        setTimeout(() => {
          navigate('/login');
        }, 0);
      }
    });
    console.log("username", username);
    console.log("password", password);
  };
  return (
    <section className='pageLoginContainer'>
      <div className='loginContainer container-fluid'>
        <h1>LOGIN TO DASHBOARD</h1>
        {error && <div className="error-message">{error}</div>}
        <div className='loginInputContainer'>
          <form onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Enter your username here"
              className='form-control'
              value={username}
              onChange={e => setUsername(e.target.value)}
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
