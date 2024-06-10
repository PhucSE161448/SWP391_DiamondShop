import React from 'react'
import CreateAccount from './CreateAccount'; './CreateAccount';
import ReadAccount from './ReadAccount';
import ReadAccountByID from './ReadAccountByID';
import ReadAccountByName from './ReadAccountByName';
import UpdateAccount from './UpdateAccount';
import DelelteAccount from './DeleteAccount';

export default function Account() {
	return (
		<div className='contentAdminContainer'>
			<div className='CRUDContainer '>
				<div className='titleOfFormContainer'>
					<h2>Account</h2>
				</div>
				<div className='buttonContainer'>
					<CreateAccount></CreateAccount>
					<ReadAccount></ReadAccount>
					<ReadAccountByID></ReadAccountByID>
					<ReadAccountByName></ReadAccountByName>
					<UpdateAccount></UpdateAccount>
					<DelelteAccount></DelelteAccount>
				</div>
			</div>
		</div>
	)
}
