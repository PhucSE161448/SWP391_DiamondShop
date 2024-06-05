import React, { useState, useEffect } from 'react'

export default function ReadAccountByName() {
	const [nameAccount, setNameAccount] = useState('')
	const [showByNameCW, setShowByNameCW] = useState(false)
	const [data, setData] = useState(null)
	const [context, setContext] = useState('SEARCH BY NAME')

	const handleClick = () => {
		setShowByNameCW(!showByNameCW)
		setContext(prevContext => prevContext === 'SEARCH BY NAME' ? 'Click again to close SEARCH BY NAME' : 'SEARCH BY ID')
	}

	const handleClear = () => {
		setNameAccount('')
		setData(null)
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (nameAccount === '') {
			setData('')
		}
		if (nameAccount) {
			const url = 'https://localhost:7122/api/Account/SearchByName/' + nameAccount;
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(response => response.json())
				.then(responseData => {
					setData(responseData)
				})
				.catch((error) => console.error('Error:', error))
		}
	}

	function getRoleName(roleId) {
		switch (roleId) {
			case 1:
				return 'Admin';
			case 2:
				return 'Sale staff';
			case 3:
				return 'Delivery staff';
			case 4:
				return 'Customer';
		}
	}

	function checkData() {
		if (data !== null) {
			if (data.isDeleted) {
				return (<h3>This account is deleted</h3>)
			} else {
				return (
					<div>
						{
							data.StatusCode === 404 ? (<h3>Account not found</h3>) : (
								<table className='table table-striped table-bordered '>
									<thead>
										<tr>
											<th>Id</th >
											<th>Name</th>
											<th>Email</th>
											<th>Gender</th>
											<th>Phone number</th>
											<th>Role</th>
										</tr >
									</thead >
									<tbody>
										{data.map(account => {
											if (account.isDeleted) {
												return (<tr><td colSpan="4">This account is deleted</td></tr>)
											} else {
												return (
													<tr>
														<td>{account.id}</td>
														<td>{account.name}</td>
														<td>{account.email}</td>
														<td>{account.gender ? "Male" : "Female"}</td>
														<td>{account.phoneNumber}</td>
														<td>{getRoleName(account.roleId)}</td>
													</tr>
												);
											}
										})}
									</tbody>
								</table >
							)
						}

					</div >
				)
			}
		}
	}

	return (
		<div>
			<button className='CRUDButton btn btn-primary btn-lg' onClick={handleClick}>{context}</button>
			{showByNameCW &&
				<div className='formCRUDContainer'>
					<h3>SEARCH BY NAME</h3>
					<form onSubmit={handleSubmit}>
						<div>
							<input type="text" value={nameAccount} onChange={e => setNameAccount(e.target.value)} className='form-control' placeholder='Name' />
						</div>
						<div className='formSubmit'>
							<input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
							<input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
						</div>
					</form>
					{checkData()}
				</div>
			}

		</div >
	)
}