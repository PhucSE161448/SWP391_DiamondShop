import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useMatch, useResolvedPath, Outlet } from 'react-router-dom'
import './NavbarAdmin.css'
import { LogoutByButton } from '../../Auth/AuthFunction'
import { CaretDownOutlined } from '@ant-design/icons'
import { Menu, } from 'antd';
import { Button } from '@mui/material';
export default function NavbarAdmin() {

	const navigate = useNavigate();

	function goToCategory() {
		navigate('/admin/category');
	}

	function goToAccount() {
		navigate('/admin/account');
	}

	function goToHome() {
		navigate('/');
	}

	function goToAdmin() {
		navigate('/admin');
	}
	function goToProductCreate() {
		navigate('/admin/product/create');
	}
	return (
		<div>
			<Menu theme="dark" className='container-fluid' id='navbarAdminContainer'>
				<Menu.Item>
					<Button onClick={goToHome} sx={{ color: '#a6adb4' }}>Home</Button>
				</Menu.Item>
				<Menu.Item>
					<Button onClick={goToAdmin} sx={{ color: '#a6adb4' }}>Admin</Button>
				</Menu.Item>

				<Menu.SubMenu key="sub1" title={<Button sx={{ color: '#a6adb4' }}>Element</Button>} mode="vertical">
					<Menu.Item>
						<Button onClick={goToCategory} sx={{ color: '#a6adb4' }}>Category</Button>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={goToAccount} sx={{ color: '#a6adb4' }}>Account</Button>
					</Menu.Item>
					<Menu.SubMenu key="sub1-3" title={<Button sx={{ color: '#a6adb4' }}>Product</Button>}>
						<Menu.Item key="sub1-3-1">
							<Button onClick={goToProductCreate} sx={{ color: '#a6adb4' }}>Create</Button>
						</Menu.Item>
					</Menu.SubMenu>
				</Menu.SubMenu>
				<Menu.Item>
					<button onClick={LogoutByButton} className='btn btn-danger btn-block'><CustomLink to="/">Log out</CustomLink></button>
				</Menu.Item>
			</Menu>
			<Outlet />
		</div >
	)
}
function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to)
	const isActive = useMatch({ path: resolvedPath.pathname, end: true })

	return (
		<Link to={to} {...props} className={isActive ? "active" : ""}>
			{children}
		</Link>
	)
}