import React, { useEffect } from 'react'
import ReadAccount from './CRUDAccount'
import { useNavigate } from 'react-router-dom'

export default function Account() {
	const role = localStorage.getItem('role')
	const navigate = useNavigate()

	useEffect(() => {
		if (role !== '1' && role !== '2') {
			navigate('/admin')
		}
	})
	return (
		<div className='contentAdminContainer'>
			<div className='CRUDContainer '>
				<div className='titleOfFormContainer'>
					<h2>Account</h2>
				</div>
				<div className='buttonContainer'>
					<ReadAccount></ReadAccount>
				</div>
			</div>
		</div>
	)
}
