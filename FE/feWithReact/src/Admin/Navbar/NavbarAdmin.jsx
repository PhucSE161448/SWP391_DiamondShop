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
	return (
		<div>
			<Menu theme="dark" className='container-fluid' id='navbarAdminContainer' sx={{
				Height: '-webkit-fill-available',
			}}>
				<Menu.Item>
					<Button onClick={goToHome} sx={buttonStyle}>Home</Button>
				</Menu.Item>
				<Menu.Item>
					<Button onClick={goToAdmin} sx={buttonStyle}>Admin</Button>
				</Menu.Item>

				<Menu.SubMenu key="sub1" title={<Button sx={buttonStyle}>Element</Button>} mode="vertical">
					<Menu.Item>
						<Button onClick={goToCategory} sx={buttonStyle}>Category</Button>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={goToAccount} sx={buttonStyle}>Account</Button>
					</Menu.Item>
					<Menu.SubMenu key="sub1-3" title={<Button sx={buttonStyle}>Product</Button>}>
						<Menu.Item key="sub1-3-1">
							<Button onClick={goToProductCreate} sx={buttonStyle}>Create</Button>
						</Menu.Item>
						<Menu.Item key="sub1-3-2">
							<Button onClick={goToProductShow} sx={buttonStyle}>Show</Button>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.Item>
						<Button onClick={goToWarranty} sx={buttonStyle}>Warranty</Button>
					</Menu.Item>
				</Menu.SubMenu>

				<Menu.Item>
					<Button onClick={Logout} sx={buttonStyle} color='error' variant="contained">Log out</Button>
				</Menu.Item>
			</Menu>
			<Outlet />
		</div >
	)
}