import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function validateUser(userData) {
    let BaseUrl = "https://localhost:7122/api/Authentication/Login/login";
    return new Promise((resolve, reject) => {
        fetch(BaseUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(responseJson => {
                // So sánh username và password với dữ liệu từ API
                let successValue
                let token
                if (typeof responseJson === 'string') {
                    const obj = JSON.parse(responseJson)
                    successValue = obj.success // replace 'success' with the actual property name
                    token = obj.token
                } else if (typeof responseJson === 'object' && responseJson !== null) {
                    successValue = responseJson.success // replace 'success' with the actual property name
                    token = responseJson.token
                }
                if (successValue === true) {
                    resolve(token)
                } else {
                    reject("Error: Operation was not successful")
                }

            })
            .catch(error => {
                reject(error);
            });
    });
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
    }, []);
}

export function LogoutByButton() {
    localStorage.removeItem('token');
}