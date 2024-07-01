
import './navBar.css';

import { Link, useNavigate, Outlet } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { Menu, Dropdown } from 'antd'
import { LogoutByButton } from '../../Auth/AuthFunction'
import { jwtDecode } from 'jwt-decode'
import { createApi } from '../../Auth/AuthFunction';
export default function Navbar() {
	const [categories, setCategories] = useState([])
	const [token, setToken] = useState(null)
	const [decodedToken, setDecodedToken] = useState()
	const [collections, setCollections] = useState([])
	const [role, setRole] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		setToken(token)
		if (token) {
			const decodedToken = jwtDecode(token)
			setRole(decodedToken.Role)
			setDecodedToken(decodedToken)
		}
	}, [])

	useEffect(() => {
		const GetAllCategories = async () => {
			const url = createApi('Category/GetAllCategories')
			const response = await fetch(url);
			const data = await response.json();
			setCategories(data);
		}
		GetAllCategories()
	}, [])

	useEffect(() => {
		const GetAllCollections = async () => {
			const url = createApi('Collection/GetAllCollections')
			const response = await fetch(url);
			const data = await response.json();
			setCollections(data);
		}
		GetAllCollections()
	}, [])

	const buttonStyle = {
		color: '#fff',
		width: '-webkit-fill-available',
		borderRadius: '50px',
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

	const goToHome = () => {
		navigate('/')
	}

	const Logout = () => {
		LogoutByButton()
		navigate('/')
	}

	const goToCategory = (id) => {
		navigate(`/category/${id}`)
	}

	const goToCollection = (id) => {
		navigate(`/collection/${id}`)
	}

	const categorySubmenu = (
		<>
			{categories.map((category, index) => (
				<Menu.Item key={index} style={{
					...paddingStyle,
					borderBottom: '1px solid #fff',
				}}>
					<Button onClick={() => goToCategory(category.id)} sx={buttonStyle}>{category.name}</Button>
				</Menu.Item>
			))}
		</>
	)

	const collectionsSubmenu = (
		<>
			{collections.map((collection, index) => (
				<Menu.Item key={index} style={{
					...paddingStyle,
					borderBottom: '1px solid #fff',
				}}>
					<Button onClick={() => goToCollection(collection.id)} sx={buttonStyle}>{collection.name}</Button>
				</Menu.Item>
			))}
		</>
	)

	return (
		<div>
			<Menu theme="dark" style={{
				Height: '-webkit-fill-available',
				display: 'flex',
			}}>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToHome} sx={buttonStyle}>Home</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={() => navigate('/diamondPage/1')} sx={buttonStyle}>Diamond</Button>
				</Menu.Item>

				<Menu.SubMenu
					title={
						<Button onClick={() => navigate('/product/1')} sx={buttonStyle}>
							Product
						</Button>
					}
					style={paddingStyle}>
					<Menu.SubMenu key="subcategoryMenu" title={
						<Button sx={buttonStyle}>
							Category
						</Button>} popupOffset={[0, 0]}>
						{categorySubmenu}
					</Menu.SubMenu>
					<Menu.SubMenu key="collectionMenu" title={
						<Button sx={buttonStyle}>
							Collection
						</Button>} popupOffset={[0, 0]}>
						{collectionsSubmenu}
					</Menu.SubMenu>
				</Menu.SubMenu>
				<Menu.Item style={paddingStyle}>
					<Button onClick={() => navigate('/cart')} sx={buttonStyle}><ShoppingCartIcon fontSize='large'></ShoppingCartIcon></Button>
				</Menu.Item>
				{token ? (
					<>
						<Menu.Item key="navigate" style={paddingStyle}>
							<Button onClick={() => navigate(role === '1' ? '/admin' : '/profile')} sx={buttonStyle}>
								{role === '1' ? 'Admin' : 'Profile'}
							</Button>
						</Menu.Item>
						<Menu.Item key="logout" style={paddingStyle}>
							<Button onClick={Logout} sx={{
								color: '#fff',
								width: '-webkit-fill-available',
							}} color='error' variant="contained">Log out</Button>
						</Menu.Item>
					</>
				) : (
					<Menu.Item style={paddingStyle}>
						<Button onClick={() => navigate('/login')} sx={buttonStyle}>Login</Button>
					</Menu.Item>
				)}
			</Menu>
			<Outlet />
			<h1>
				Footer will go here in navbar.jsx
			</h1>
		</div>
	)
}
