import React, { useEffect } from 'react'
import CRUDDiamondCase from './CRUDDiamondCase'
import { useNavigate } from 'react-router-dom'

export default function DiamondCase() {
	const navigate = useNavigate()
	const role = localStorage.getItem('role')

	useEffect(() => {
		if (role !== '1') {
			navigate('/admin')
		}
	})
	return (
		<div className='contentAdminContainer'>
			<div className='CRUDContainer '>
				<div className='titleOfFormContainer'>
					<h2>Diamond Case</h2>
				</div>
				<div className='buttonContainer'>
					<CRUDDiamondCase></CRUDDiamondCase>
				</div>
			</div>
		</div>
	)
}
