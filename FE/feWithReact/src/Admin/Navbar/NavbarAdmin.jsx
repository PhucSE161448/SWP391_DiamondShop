import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useMatch, useResolvedPath, Outlet } from 'react-router-dom'
import './NavbarAdmin.css'
import { LogoutByButton } from '../../Auth/AuthFunction'
import { CaretDownOutlined } from '@ant-design/icons'
import { Menu, } from 'antd'
import { Button } from '@mui/material'
import { Height } from '@mui/icons-material'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';
export default function NavbarAdmin() {
	const navigate = useNavigate()

	function goToCategory() {
		navigate('/admin/category')
	}

	function goToAccount() {
		navigate('/admin/account')
	}

	function goToHome() {
		navigate('/')
	}

	function goToAdmin() {
		navigate('/admin')
	}

	function Logout() {
		LogoutByButton()
		navigate('/')
	}

	function goToWarranty() {
		navigate('/admin/warranty')
	}

	function goToProduct() {
		navigate('/admin/product')
	}

	const buttonStyle = {
		color: '#fff',
		width: '-webkit-fill-available',
		backgroundColor: '#001529',
		':hover': {
			backgroundColor: '#6f6f6f', // Adjust the color as needed
		},
	}

	const paddingStyle = {
		padding: 0,
		backgroundColor: '#001529',
		':hover': {
			backgroundColor: '#004085', // Adjust the color as needed
		},
	}

	return (
		<div>
			<Menu theme="dark" className='container-fluid' id='navbarAdminContainer' style={{
				Height: '-webkit-fill-available',
				width: '10%',
			}}>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToHome} sx={buttonStyle}>Home</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToAdmin} sx={buttonStyle}>Admin</Button>
				</Menu.Item >
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToCategory} sx={buttonStyle}>Category</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToAccount} sx={buttonStyle}>Account</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToProduct} sx={buttonStyle}>Product</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToWarranty} sx={buttonStyle}>Warranty</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={Logout} sx={{
						color: '#fff',
						width: '-webkit-fill-available',

					}} color='error' variant="contained">Log out</Button>
				</Menu.Item>
			</Menu>
			<Outlet />
		</div >
	)
}