import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react';
import './Admin.css'

import { Route, Routes } from 'react-router-dom';

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
                    {/* <div>
                        <h1>ADMIN PAGE</h1>
                    </div> */}
                    <NavbarAdmin></NavbarAdmin>
                </div>
            )
        }
    }
}
