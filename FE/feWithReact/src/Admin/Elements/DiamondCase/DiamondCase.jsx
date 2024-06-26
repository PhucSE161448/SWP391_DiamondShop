import React from 'react'
import CRUDDiamondCase from './CRUDDiamondCase'

export default function DiamondCase() {
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
