import React, { useState } from 'react'

export default function DelelteClarity() {
	const [idClarity, setIdClarity] = useState('')
	const [showByIdClarity, setShowByIdClarity] = useState(false)
	const [context, setContext] = useState('DELETE')
	const [data, setData] = useState(null)

	const handleClick = () => {
		setShowByIdClarity(!showByIdClarity)
		setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close DELETE' : 'DELETE')
	}

	const handleClear = () => {
		setIdClarity('')
		setData(null)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (idClarity) {
			const url = 'https://localhost:7122/api/Clarity/Delete/' + idClarity
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Accept': '*/*'
				},
			}).then(response => response.json())
				.then(responseData => setData(responseData))
		}
	}

	return (
		<>
			<button className='CRUDButton btn btn-danger btn-lg' onClick={handleClick}>{context}</button>
			{showByIdClarity &&
				<div className='formCRUDContainer'>
					<h3 className='titleOfForm'>DELETE CLARITY</h3>
					<form onSubmit={handleSubmit}>
						<div>
							<input type="text" value={idClarity} onChange={e => setIdClarity(e.target.value)} className='form-control' placeholder='Id' />
						</div>
						{
							data ? (data.StatusCode === 404 ? (<h3>{data.ErrorMessage}</h3>) : (
								data.StatusCode === 400 ? (<h3>{data.ErrorMessage}</h3>) : (
									<h3>Delete successful</h3>
								))) : null
						}
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
