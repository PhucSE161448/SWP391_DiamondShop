
import './navBar.css';

import { Link, useNavigate, Outlet } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react'
import { Button, hexToRgb } from '@mui/material';
import { Menu, } from 'antd'
import { LogoutByButton } from '../../Auth/AuthFunction'
import { jwtDecode } from 'jwt-decode'
import { createApi } from '../../Auth/AuthFunction';
import Footer from '../Footer/Footer';
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
		height: '100%',
		backgroundColor: '#001529',
		':hover': {
			backgroundColor: '#6f6f6f', // Adjust the color as needed
		},
	}

	const paddingStyle = {
		padding: 0,
		width: '100%',
		height: '100%',
		backgroundColor: '#001529',
		':hover': {
			backgroundColor: '#004085', // Adjust the color as needed
		},
	}

	const goToHome = () => {
		navigate('/')
	}

	const Logout = () => {
		navigate('/')
		LogoutByButton()
		window.location.reload();
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
				!category.isDeleted && (
					<Menu.Item key={`category-${index}`} style={{
						...paddingStyle,
						borderBottom: '1px solid #fff',
					}}>
						<Button onClick={() => goToCategory(category.id)} sx={buttonStyle}>{category.name}</Button>
					</Menu.Item>
				)
			))}
		</>
	)

	const collectionsSubmenu = (
		<>
			{collections.map((collection, index) => (
				!collection.isDeleted && (
					<Menu.Item key={`collection-${index}`} style={{
						...paddingStyle,
						borderBottom: '1px solid #fff',
					}}>
						<Button onClick={() => goToCollection(collection.id)} sx={buttonStyle}>{collection.name}</Button>
					</Menu.Item>
				)
			))}
		</>
	)

	return (
		<div>
			<Menu theme="dark" style={{
				height: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
				<Menu.Item style={paddingStyle}>
					<Button onClick={goToHome} sx={buttonStyle}>Home</Button>
				</Menu.Item>
				<Menu.Item style={paddingStyle}>
					<Button onClick={() => navigate('/diamondPage/1')} sx={buttonStyle}>Diamond</Button>
				</Menu.Item>
				<Menu.SubMenu key='productMenu'
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
					<Button onClick={() => navigate('/cart')} sx={buttonStyle}>
						<ShoppingCartIcon sx={{ fontSize: '30px' }}></ShoppingCartIcon>
					</Button>
				</Menu.Item>
				{token ? (
					<>
						<Menu.SubMenu key="navigate" style={{
							...paddingStyle,
							backgroundColor: '#001529',
						}} title={<Button sx={buttonStyle}>{decodedToken.Name}</Button>}>
							<Menu.Item style={{
								backgroundColor: '#001529',
							}}>
								<Button sx={{
									...buttonStyle,

								}} onClick={() => navigate(role >= '1' && role <= '4' ? '/admin' : '/profile')} >
									View Profile
								</Button>
							</Menu.Item>
							<Menu.Item style={{
								backgroundColor: '#001529',
							}}>
								<Button sx={buttonStyle} onClick={() => navigate('/order')} >
									View Order
								</Button>
							</Menu.Item>
						</Menu.SubMenu>

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
			<Footer></Footer>
		</div>
	)
}
