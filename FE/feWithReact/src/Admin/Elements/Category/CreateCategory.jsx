import React, { useState } from 'react'
import { TextField, Container, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
export default function CreateCategory() {
	const [nameCategory, setnameCategory] = useState('')
	const [colorClarity, setColorClarity] = useState('')
	const [priceClarity, setpriceClarity] = useState('')
	const [showCreateCW, setShowCreateCW] = useState(false)
	const [context, setContext] = useState('CREATE')
	const [data, setData] = useState(null)
	const handleClick = () => {
		setShowCreateCW(!showCreateCW)
		setContext(prevContext => prevContext === 'CREATE' ? 'Click again to close CREATE' : 'CREATE')
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
		Create(nameCategory)
	}

	const handleClear = () => {
		setnameCategory('')
		setData(null)
	}

	function Create(Name) {
		const url = 'https://localhost:7122/api/Category/CreateCategory';
		const data = {
			name: Name
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': '*/*'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(responseData =>
				setData(responseData)
			)
	}

	return (
		<Container>
			<button onClick={handleClick} className='CRUDButton btn btn-success btn-lg'>{context}</button>
			{showCreateCW &&
				<div className='formCRUDContainer'>
					<h3 className='titleOfForm'>CREATE CATEGORY</h3>
					<div>
						<form onSubmit={handleSubmit} className='row'>
							<div className='col'>
								<TextField type="text" value={nameCategory}
									onChange={e => setnameCategory(e.target.value)} id="outlined-basic" label="Name" variant="outlined" className='form-control' />
							</div>
							{
								data ? (data.status === 400 ? (
									<h3>{data.errors.Price}</h3>
								) : (<h3>Create successful</h3>)) : null
							}
							<div className='formSubmit' >
								<Button
									type="submit"
									className='submitButton'
									value="Submit" variant="contained"
									size="large" endIcon={<SendIcon />}
									sx={{
										margin: '5px',
									}}>
									Send
								</Button>
								<Button type="button"
									value="Clear" onClick={handleClear}
									className='submitButton'
									variant="contained" size="large" color="error"
									endIcon={<CancelScheduleSendIcon />}
									sx={{
										margin: '5px',
									}}>
									Clear
								</Button>
							</div>
						</form>
					</div>
				</div >
			}
		</Container >
	);
}