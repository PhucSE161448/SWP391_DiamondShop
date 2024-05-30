import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react';

export default function Admin() {
    let navigate = useNavigate();

    if (localStorage.getItem('token') !== null) {
        const decodedToken = jwtDecode(localStorage.getItem('token'))
        console.log(decodedToken)
        useEffect(() => {
            if (decodedToken.Role !== '1') {
                navigate('/');
            }

        }, [decodedToken.Role]);

        if (decodedToken.Role === '1') {
            return (
                <div>
                    <h1>admin</h1>
                    <button>
                        <Link to='/'>Home</Link>
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
