
import './navBar.css';

import { Link, useMatch, useResolvedPath, Outlet } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Navbar() {
	return (
		<>
			<nav className='navbar-expand-lg bg-body-tertiary '>
				<div className='container-fluid' id='navBarContainer'>
					<div>
						<Link to="/" >
							Home
						</Link>
					</div>
					<CustomLink to="/diamondPage/1">Diamond</CustomLink>
					<CustomLink to="/product/1">Product</CustomLink>
					<CustomLink to="/cart"><ShoppingCartIcon fontSize='large'></ShoppingCartIcon></CustomLink>
					<CustomLink to="/login">Login</CustomLink>
				</div>
			</nav >
			<Outlet />
			<h1>
				Footer will go here in navbar.jsx
			</h1>
		</>
	)
}

function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to)
	const isActive = useMatch({ path: resolvedPath.pathname, end: true })

	return (
		<div>
			<Link to={to} {...props} className={isActive ? "active" : ""}>
				{children}
			</Link>
		</div >
	)
}