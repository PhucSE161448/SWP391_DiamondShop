import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CRUDCategory from './CRUDCategory'

export default function Category() {
	const role = localStorage.getItem('role')
	const navigate = useNavigate()

	useEffect(() => {
		if (role !== '1') {
			navigate('/admin')
		}
	})
	return (
		<div className='contentAdminContainer'>
			<div className='CRUDContainer '>
				<div className='titleOfFormContainer'>
					<h2>Category</h2>
				</div>
				<div className='buttonContainer'>
					<CRUDCategory></CRUDCategory>
				</div>
			</div>
		</div>
	)
}
