import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react';
import './Admin.css'
import CaratWeight from './CaratWeight/CaratWeight'
import Clarity from './Clarity/Clarity'
import Cut from './Cut/Cut';
import Origin from './Origin/Origin';
import { LogoutByButton } from '../Auth/AuthFucntion';
export default function Admin() {
    let navigate = useNavigate();

    if (localStorage.getItem('token') !== null) {
        const decodedToken = jwtDecode(localStorage.getItem('token'))
        useEffect(() => {
            if (decodedToken.Role !== '1') {
                navigate('/');
            }

        }, [decodedToken.Role]);

        if (decodedToken.Role === '1') {
            return (
                <div>
                    <h1>admin</h1>
                    <CaratWeight></CaratWeight>
                    <Clarity></Clarity>
                    <Cut></Cut>
                    <Origin></Origin>
                    <button>
                        <Link to='/'>Home</Link>
                    </button>
                    <button onClick={LogoutByButton}>
                        <Link to='/'>LOGOUT</Link>
                    </button>
                </div>
            )
        }
    } else {
        return (
            <div>
                You dont have permission <br />
                <button>
                    <Link to='/'>Home</Link>
                </button>
            </div>
        )
    }
}
