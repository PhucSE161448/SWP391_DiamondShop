import React, { useState, useEffect } from 'react'

export default function ReadAccountByID() {
	const [idAccount, setIdAccount] = useState('')
	const [showByIdCW, setShowByIdCW] = useState(false)
	const [data, setData] = useState(null)
	const [context, setContext] = useState('SEARCH BY ID')

	const handleClick = () => {
		setShowByIdCW(!showByIdCW)
		setContext(prevContext => prevContext === 'SEARCH BY ID' ? 'Click again to close SEARCH BY ID' : 'SEARCH BY ID')
	}

	const handleClear = () => {
		setIdAccount('')
		setData(null)
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (idAccount === '') {
			setData('')
		}
		if (idAccount) {
			const url = 'https://localhost:7122/api/Account/GetAccountById/' + idAccount;
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(response => response.json())
				.then(responseData => {
					setData(responseData);
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
										<tr key={data.id}>
											<td>{data.id}</td>
											<td>{data.name}</td>
											<td>{data.email}</td>
											<td>{data.gender ? 'Male' : 'Female'}</td>
											<td>{data.phoneNumber}</td>
											<td>{getRoleName(data.roleId)}</td>
										</tr>
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
			{showByIdCW &&
				<div className='formCRUDContainer'>
					<h3>SEARCH BY ID</h3>
					<form onSubmit={handleSubmit}>
						<div>
							<input type="text" value={idAccount} onChange={e => setIdAccount(e.target.value)} className='form-control' placeholder='Id' />
						</div>
						<div className='formSubmit'>
							<input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
							<input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
						</div>
					</form>

					{checkData()}
				</div>
			}

		</div>
	)
}