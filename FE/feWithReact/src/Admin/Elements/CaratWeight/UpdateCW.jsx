import React, { useState } from 'react'

export default function UpdateCW() {
	const [idCW, setIdCW] = useState('')
	const [weightCW, setWeightCW] = useState('')
	const [priceCW, setPriceCW] = useState('')
	const [showUpdateCW, setShowUpdateCW] = useState(false)
	const [context, setContext] = useState('UPDATE')
	const [dataCW, setDataCW] = useState(null)
	const handleClick = () => {
		setShowUpdateCW(!showUpdateCW)
		setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close' : 'UPDATE')
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
		UpdateCaratWeight(idCW, weightCW, priceCW)
	}
	const handleClear = () => {
		setIdCW('')
		setWeightCW('')
		setPriceCW('')
		setDataCW(null)
	}
	function UpdateCaratWeight(Id, Weight, Price) {
		const url = 'https://localhost:7122/api/CaratWeight/Update/' + idCW;
		const formData = new FormData()
		formData.append('Id', Id);
		formData.append('Weight', Weight)
		formData.append('Price', Price)
		fetch(url, {
			method: 'PUT',
			headers: {
				'Accept': '*/*',
			},
			body: formData
		})
			.then(response => response.json())
			.then(responseData => {
				setDataCW(responseData)
			})
	}
	return (
		<div>
			<button className='CRUDButton btn btn-warning btn-lg' onClick={handleClick}>{context}</button>
			{showUpdateCW &&
				<div className='formCRUDContainer'>
					<h3 className='titleOfForm'>UPDATE CARAT WEIGHT</h3>
					<form onSubmit={handleSubmit} className='row'>
						<div className='col-4'>
							<input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} className='form-control' placeholder='Id' />
						</div>
						<div className='col-4'>
							<input type="text" value={weightCW} onChange={e => setWeightCW(e.target.value)} className='form-control' placeholder='Weight' />
						</div>
						<div className='col-4'>
							<input type="text" value={priceCW} onChange={e => setPriceCW(e.target.value)} className='form-control' placeholder='Price' />
						</div>
						{
							dataCW ? (dataCW.status === 404 ? (<h3>{dataCW.ErrorMessage}</h3>) : (
								dataCW.status === 400 ? (
									<div>
										<h3>{dataCW.errors.Price}</h3>
										<h3>{dataCW.errors.Weight}</h3>
									</div>
								) : (<h3>Update successful</h3>)
							)

							) : null
						}
						<div className='formSubmit'>
							<input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
							<input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
						</div>
					</form>
				</div>
			}
		</div>
	)
}
