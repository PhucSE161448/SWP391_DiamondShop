import React, { useState } from 'react'

export default function UpdateAccount() {
	const [idAccount, setIdAccount] = useState('')
	const [nameAccount, setnameAccount] = useState('')
	const [emailAccount, setEmailAccount] = useState('')
	const [genderAccount, setGenderAccount] = useState(true)
	const [phoneAccount, setPhoneAccount] = useState('')
	const [addressAccount, setAddressAccount] = useState('')

	const [showUpdateCW, setShowUpdateCW] = useState(false)
	const [context, setContext] = useState('UPDATE')
	const [data, setData] = useState(null)
	const handleClick = () => {
		setShowUpdateCW(!showUpdateCW)
		setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close UPDATE' : 'UPDATE')
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
		updateAccount(idAccount, emailAccount, nameAccount, genderAccount, phoneAccount, addressAccount)
	}

	const handleClear = () => {
		setIdAccount('')
		setnameAccount('')
		setEmailAccount('')
		setGenderAccount(true)
		setPhoneAccount('')
		setAddressAccount('')
		setData(null)
	}
	function checkData() {
		if (data !== null) {
			if (data.status === 400) {
				return (
					<div>
						<h3>This account is deleted</h3>
					</div>
				)
			} else {
				return (
					<div>
						{
							data.status === 404 ? (<h3>Account not found</h3>) : (
								<h3>
									Update successful
								</h3>
							)
						}
					</div >
				)

			}
		}
	}
	function updateAccount(Id, Email, Name, Gender, Phone, Address) {
		const url = 'https://localhost:7122/api/Account/UpdateUser/' + Id
		const data = {
			"id": parseInt(Id),
			"name": Name,
			"email": Email,
			"gender": Gender,
			"phoneNumber": Phone,
			"address": Address
		}
		fetch(url, {
			method: 'PUT',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(responseData => {
				setData(responseData)
			})

	}
	return (
		<div>
			<button className='CRUDButton btn btn-warning btn-lg' onClick={handleClick}>{context}</button>
			{showUpdateCW &&
				<div className='formCRUDContainer'>
					<h3 className='titleOfForm'>UPDATE Account</h3>
					<form onSubmit={handleSubmit}>
						<div className='row'>
							<div className='col-12'>
								<input type="text" value={idAccount} onChange={e => setIdAccount(e.target.value)} placeholder='Id' className='form-control' />
							</div>
						</div> <br />
						<div className='row'>
							<div className='col-6'>
								<input type="text" value={nameAccount} onChange={e => setnameAccount(e.target.value)} placeholder='Name' className='form-control' />
							</div>
							<div className='col-6'>
								<input type="text" value={emailAccount} onChange={e => setEmailAccount(e.target.value)} placeholder='Email' className='form-control' />
							</div>

						</div><br />
						<div className='row'>
							<div className='col-4'>
								<input type="text" value={addressAccount} onChange={e => setAddressAccount(e.target.value)} placeholder='Address' className='form-control' />

							</div>
							<div className='col-4'>
								<select value={genderAccount} onChange={e => setGenderAccount(e.target.value === "true")} className='form-control'>
									<option value={true}>Male</option>
									<option value={false}>Female</option>
								</select>
							</div>
							<div className='col-4'>
								<input type="text" value={phoneAccount} onChange={e => setPhoneAccount(e.target.value)} placeholder='Phone' className='form-control' />
							</div>
						</div>
						{checkData()}

						<div className='formSubmit' >
							<input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
							<input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
						</div>
					</form>
				</div>
			}
		</div>
	)
}
