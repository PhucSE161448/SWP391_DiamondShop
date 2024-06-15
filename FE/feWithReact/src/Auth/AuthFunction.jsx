import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function validateUser(userData) {
	let BaseUrl = "https://localhost:7122/api/Authentication/Login/"
	return new Promise((resolve, reject) => {
		fetch(BaseUrl, {
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
	localStorage.removeItem('token')
}