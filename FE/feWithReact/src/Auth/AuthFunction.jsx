import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export function createApi(endpointPath) {
	const BaseUrl = "https://diamond-shopp.azurewebsites.net/api/"
	return BaseUrl + endpointPath
}

export function LogoutAndRedirect() {
	let navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem('token')) {
			const tokenExpirationTime = 1000;
			const timeoutId = setTimeout(() => {
				localStorage.removeItem('token');
				navigate('/')
				window.alert('Session time out')
			}, tokenExpirationTime);

			// Cleanup function to clear the timeout if the component unmounts
			return () => clearTimeout(timeoutId);
		}
	}, [])
}

export function LogoutByButton() {
	localStorage.removeItem('role')
	localStorage.removeItem('token')
}

export function LogoutByButtonAdmin() {
	localStorage.removeItem('role')
	localStorage.removeItem('token')
}