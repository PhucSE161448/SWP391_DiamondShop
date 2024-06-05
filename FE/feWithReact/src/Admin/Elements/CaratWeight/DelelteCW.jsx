import React, { useState } from 'react'

export default function DelelteCW() {
	const [idCW, setIdCW] = useState('')
	const [showByIdCW, setShowByIdCW] = useState(false)
	const [context, setContext] = useState('DELETE')
	const [data, setData] = useState(null)
	const [deleteSuccessful, setDeleteSuccessful] = useState(false)
	const handleClick = () => {
		setShowByIdCW(!showByIdCW)
		setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close' : 'DELETE')
	}

	const handleClear = () => {
		setIdCW('')
		setData(null)
		setDeleteSuccessful(false)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (idCW) {
			const url = 'https://localhost:7122/api/CaratWeight/Delete/' + idCW
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(response => response.json())
				.then(responseData => setData(responseData))
				.catch(error => {
					setData(error)
					setDeleteSuccessful(true)
				})
		}
	}

	return (
		<div>
			<button className='CRUDButton btn btn-danger btn-lg' onClick={handleClick}>{context}</button>
			{showByIdCW &&
				<div className='formCRUDContainer'>
					<h3 className='titleOfForm'>DELETE CARAT WEIGHT</h3>
					<form onSubmit={handleSubmit}>
						<div>
							<input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} className='form-control' placeholder='Id' />
						</div>
						{
							data ? (data.StatusCode === 404 ? (<h3>{data.ErrorMessage}</h3>) : (
								data.StatusCode === 400 ? (<h3>{data.ErrorMessage}</h3>) : null
							)) : null
						}
						{
							(deleteSuccessful ? (<h3>Delete successful</h3>) : null)
						}
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
