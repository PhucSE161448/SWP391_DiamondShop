import React from 'react'

import ReadAccount from './CRUDAccount'

import UpdateAccount from './UpdateAccount'

export default function Account() {
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
