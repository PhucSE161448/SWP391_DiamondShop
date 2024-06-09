import React from 'react'

import CRUDCategory from './CRUDCategory'

export default function Category() {
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
