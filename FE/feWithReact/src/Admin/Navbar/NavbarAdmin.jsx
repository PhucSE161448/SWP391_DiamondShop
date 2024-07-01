import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import './NavbarAdmin.css'
import { LogoutByButton } from '../../Auth/AuthFunction'
import { Menu, } from 'antd'
import { Button } from '@mui/material'
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

	function goToDiamond() {
		navigate('/admin/diamond')
	}

	function goToDiamondCase() {
		navigate('/admin/diamondCase')
	}

	function goToCollections() {
		navigate('/admin/collections')
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
					<Button onClick={goToAccount} sx={buttonStyle}>Account</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToCategory} sx={buttonStyle}>Category</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToCollections} sx={buttonStyle}>Collection</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToDiamond} sx={buttonStyle}>Diamond</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToDiamondCase} sx={buttonStyle}>Diamond Case</Button>
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