import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useMatch, useResolvedPath, Outlet } from 'react-router-dom'
import './NavbarAdmin.css'
import { LogoutByButton } from '../../Auth/AuthFunction'
import { CaretDownOutlined } from '@ant-design/icons'
import { Menu, } from 'antd'
import { Button } from '@mui/material'
import { Height } from '@mui/icons-material';
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

	function goToProductCreate() {
		navigate('/admin/product/create')
	}

	function goToProductShow() {
		navigate('/admin/product/showAllProduct')
	}

	function Logout() {
		LogoutByButton()
		navigate('/')
	}

	function goToWarranty() {
		navigate('/admin/warranty')
	}

	const buttonStyle = {
		color: '#fff',
		width: '-webkit-fill-available',
	}

	const paddingStyle = {
		padding: 0,
	}
	return (
		<div>
			<Menu theme="dark" className='container-fluid' id='navbarAdminContainer' sx={{
				Height: '-webkit-fill-available',
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
				<Menu.SubMenu style={paddingStyle} key="sub1-3" title={<Button sx={buttonStyle}>Product</Button>}>
					<Menu.Item key="sub1-3-1" style={paddingStyle}>
						<Button onClick={goToProductCreate} sx={buttonStyle}>Create</Button>
					</Menu.Item >
					<Menu.Item key="sub1-3-2" style={paddingStyle}>
						<Button onClick={goToProductShow} sx={buttonStyle}>Show</Button>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToWarranty} sx={buttonStyle}>Warranty</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={Logout} sx={buttonStyle} color='error' variant="contained">Log out</Button>
				</Menu.Item>
			</Menu>
			<Outlet />
		</div >
	)
}