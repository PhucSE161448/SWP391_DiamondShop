import React, { useState } from 'react'

export default function DelelteAccount() {
	const [idAccount, setIdAccount] = useState('')
	const [showByIdAccount, setShowByIdAccount] = useState(false)
	const [context, setContext] = useState('DELETE')
	const [data, setData] = useState(null)
	const handleClick = () => {
		setShowByIdAccount(!showByIdAccount)
		setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close DELETE' : 'DELETE')
	}

	const handleClear = () => {
		setIdAccount('')
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
								<h3>Delete successful</h3>
							)
						}
					</div >
				)
			}
		}
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		if (idAccount) {
			const url = 'https://localhost:7122/api/Account/DeleteUser/' + idAccount
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(responseData => {
					setData(responseData);
				})
				.catch((error) => console.error('Error:', error))
		}
	}

	return (
		<>
			<button className='CRUDButton btn btn-danger btn-lg' onClick={handleClick}>{context}</button>
			{showByIdAccount &&
				<div className='formCRUDContainer'>
					<h3 className='titleOfForm'>DELETE Account</h3>
					<form onSubmit={handleSubmit}>
						<div>
							<input type="text" value={idAccount} onChange={e => setIdAccount(e.target.value)} className='form-control' placeholder='Id' />
						</div>
						{checkData()}
						<div className='formSubmit' >
							<input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
							<input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
						</div>
					</form>
				</div>
			}
		</>
	)
}
