import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './Admin.css'
import NavbarAdmin from './Navbar/NavbarAdmin'
export default function AdminNav() {
	let navigate = useNavigate();
	const role = localStorage.getItem('role');
	if (localStorage.getItem('token')) {

		useEffect(() => {
			if (role === '5') {
				navigate('/')
			}
		}, [role]);

		if (role >= '1' && role <= '4') {
			return (
				<>
					<div className='pageAdminContainer'>
						<NavbarAdmin />
					</div>
				</>
			)
		}
	}
}
