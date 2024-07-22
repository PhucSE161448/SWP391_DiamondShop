import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import './NavbarAdmin.css'
import { LogoutByButtonAdmin } from '../../Auth/AuthFunction'
import { Menu, } from 'antd'
import { Button } from '@mui/material'
export default function NavbarAdmin() {
	const navigate = useNavigate()
	const role = localStorage.getItem('role')

	function goToCategory() {
		navigate('/admin/category?pageNumber=1')
	}

	function goToAccount() {
		navigate('/admin/account?pageNumber=1')
	}

	function goToAdmin() {
		navigate('/admin')
	}

	function Logout() {
		LogoutByButtonAdmin()
		navigate('/')
	}

	function goToProduct() {
		navigate('/admin/product?pageNumber=1&name=&OrderBy=false')
	}

	function goToDiamond() {
		navigate('/admin/diamond?pageNumber=1&name=&OrderBy=false')
	}

	function goToDiamondCase() {
		navigate('/admin/diamondCase?pageNumber=1')
	}

	function goToCollections() {
		navigate('/admin/collections?pageNumber=1')
	}

	function goToOrder() {
		navigate('/admin/order?pageNumber=1&status=Default')
	}

	function goToPayment() {
		navigate('/admin/payment')
	}

	function goToCertificate() {
		navigate('/admin/certificate?pageNumber=1')
	}

	function goToVoucher() {
		navigate('/admin/voucher')
	}

	function goToPromotion() {
		navigate('/admin/promotion')
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
		marginBottom: '15px',
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
				<Menu.Item style={paddingStyle} key="admin">
					<Button onClick={goToAdmin} sx={buttonStyle}>Dashboard</Button>
				</Menu.Item >
				{role === '1' || role === '2' ? (
					<Menu.Item style={paddingStyle} key="Account">
						<Button onClick={goToAccount} sx={buttonStyle}>Account</Button>
					</Menu.Item>
				) : null}
				{role === '1' && (
					<>
						<Menu.Item key="Category" style={paddingStyle}>
							<Button onClick={goToCategory} sx={buttonStyle}>Category</Button>
						</Menu.Item>
						<Menu.Item key="Certificate" style={paddingStyle}>
							<Button onClick={goToCertificate} sx={buttonStyle}>Certificate</Button>
						</Menu.Item>
						<Menu.Item key="Collection" style={paddingStyle}>
							<Button onClick={goToCollections} sx={buttonStyle}>Collection</Button>
						</Menu.Item>
						<Menu.Item key="Diamond" style={paddingStyle}>
							<Button onClick={goToDiamond} sx={buttonStyle}>Diamond</Button>
						</Menu.Item>
						<Menu.Item key="Diamond Case" style={paddingStyle}>
							<Button onClick={goToDiamondCase} sx={buttonStyle}>Diamond Case</Button>
						</Menu.Item>
						<Menu.Item key="Product" style={paddingStyle}>
							<Button onClick={goToProduct} sx={buttonStyle}>Product</Button>
						</Menu.Item>
						<Menu.Item key="Promotion" style={paddingStyle}>
							<Button onClick={goToPromotion} sx={buttonStyle}>Promotion</Button>
						</Menu.Item>
						<Menu.Item key="Payment" style={paddingStyle}>
							<Button onClick={goToPayment} sx={buttonStyle}>Payment</Button>
						</Menu.Item>
						<Menu.Item key="Voucher" style={paddingStyle}>
							<Button onClick={goToVoucher} sx={buttonStyle}>Voucher</Button>
						</Menu.Item>
					</>
				)}
				{role === '1' || role === '3' || role === '4' ? (
					<Menu.Item style={paddingStyle} key="Order">
						<Button onClick={goToOrder} sx={buttonStyle}>Order</Button>
					</Menu.Item>
				) : null}
				<Menu.Item style={{
					...paddingStyle,
				}} key="Logout">
					<Button onClick={Logout} sx={{
						color: '#fff',
						width: '-webkit-fill-available',
					}} color='error' variant="contained">Log out</Button>
				</Menu.Item>
			</Menu>

		</div >
	)
}