import React, { useEffect } from 'react'
import { createApi } from '../Auth/AuthFunction'
export default function Order() {

  useEffect(() => {
    const getOrder = () => {
      const url = createApi('Order/Get')
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => response.json())
        .then(data => {
          console.log(data)
        })
    }
    getOrder()
  }, [])

  return (
    <div>Order</div>
  )
}
