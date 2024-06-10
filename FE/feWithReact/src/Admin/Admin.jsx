import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import './Admin.css'

import NavbarAdmin from './Navbar/NavbarAdmin';
export default function AdminNav() {
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
                <div className='pageAdminContainer'>
                    <NavbarAdmin></NavbarAdmin>
                </div>
            )
        }
    }
}
