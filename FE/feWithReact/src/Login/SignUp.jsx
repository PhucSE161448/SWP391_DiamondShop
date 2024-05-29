import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
export default function SignUp() {
  return (
    <section className='pageLoginContainer'>
      <div className='loginContainer container-fluid'>
        <h1>LOGIN TO DASHBOARD</h1>
        <div className='loginInputContainer'>
          <form>
            <input type="text" placeholder="Enter your email here" className='form-control' />
            <input type="password" placeholder="Password" className='form-control' />
            <input type="password" placeholder="Confirm password" className='form-control' />
            <div className='signupLink'>
              <button className='signUpButton'>
                SIGN UP
              </button>
            </div>
          </form>


          <div className='backToHomePageLink'>
            <Link to="/login" className='linkBackHome'>
              Back to login page
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
