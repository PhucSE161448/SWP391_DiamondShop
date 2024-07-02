import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export function createApi(endpointPath) {
	const BaseUrl = "https://localhost:7122/api/"
	return BaseUrl + endpointPath
}

export function validateUser(userData) {
	const url = createApi('Authentication/Login/')
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json-patch+json",
			},
			body: JSON.stringify(userData)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then(responseJson => {
				localStorage.setItem('token', responseJson.accessToken)
				const decodedToken = jwtDecode(responseJson.accessToken)
				localStorage.setItem('role', decodedToken.Role)
				resolve()
			})
			.catch(error => {
				reject(error)
			})
	})
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
	window.location.reload()
}

export function LogoutByButtonAdmin() {
	localStorage.removeItem('role')
	localStorage.removeItem('token')
}