import React from 'react'

import ReadDiamond from './CRUDDiamond'

// import UpdateAccount from './UpdateAccount'

export default function Diamond() {
	return (
		<div className='contentAdminContainer'>
			<div className='CRUDContainer '>
				<div className='titleOfFormContainer'>
					<h2>Diamond</h2>
				</div>
				<div className='buttonContainer'>
					<ReadDiamond></ReadDiamond>
				</div>
			</div>
		</div>
	)
}