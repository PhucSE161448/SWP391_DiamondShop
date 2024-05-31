import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react';
import './Admin.css'

import { LogoutByButton } from '../Auth/AuthFucntion';
import NavbarAdmin from './Navbar/NavbarAdmin';
export default function Admin() {
    let navigate = useNavigate();

    if (localStorage.getItem('token')) {
        const decodedToken = jwtDecode(localStorage.getItem('token'))
        useEffect(() => {
            if (decodedToken.Role !== '1') {
                navigate('/')
            }

        }, [decodedToken.Role]);

        if (decodedToken.Role === '1') {
            return (
                <div>
                    <div className='pageAdminContainer container-fluid'>
                        <div>
                            <NavbarAdmin></NavbarAdmin>
                        </div>
                        <div className='headerAdminContainer'>
                            <h1>ADMIN PAGE</h1>
                        </div>
                        <button onClick={LogoutByButton} className='logoutButton btn btn-danger'>
                            <Link to='/' className='logoutLink'>LOGOUT</Link>
                        </button>
                    </div>
                </div>

            )
        }
    }
}
