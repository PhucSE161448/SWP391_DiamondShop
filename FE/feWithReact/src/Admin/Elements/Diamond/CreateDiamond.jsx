import React, { useState } from 'react'
import { Button, Modal, Box, TextField, Select, InputLabel, MenuItem, OutlinedInput, FormControl } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'

export default function CreateDiamond(props) {
    const [origin, setOrigin] = useState('')
	const [color, setColor] = useState('')
	const [caratWeight, setCaratWeight] = useState('')
	const [clarity, setClarity] = useState('')
	const [cut, setCut] = useState('')
	const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
	const [dataDiamond, setDataDiamond] = useState(null)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setOrigin('')
		setColor('')
		setCaratWeight('')
		setClarity('')
		setCut('')
		setPrice('')
		setQuantity('')
		setDataDiamond(null)
    }

    const handleSubmit = (event) => {
		event.preventDefault()
		CreateDiamond('2', color, caratWeight, clarity, cut, price, quantity)
		setOrigin('')
		setColor('')
		setCaratWeight('')
		setClarity('')
		setCut('')
		setPrice('')
		setQuantity('')
		setDataDiamond(null)
	}

    const handleClear = () => {
		setOrigin('')
		setColor('')
		setCaratWeight('')
		setClarity('')
		setCut('')
		setPrice('')
		setQuantity('')
		setDataDiamond(null)
	}

    function CreateAccount(Origin, Color, CaratWeight, Clarity, Cut, Price, Quantity) {
		const url = 'https://localhost:7122/api/Diamond/CreateDiamond'
		const data = {
			origin: Origin,
			color: Color,
			caratWeight: CaratWeight,
			clarity: Clarity,
			cut: Cut,
			price: Price,
			quantity: Quantity
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json-patch+json',
				'Accept': '*/*',

			},
			body: JSON.stringify(data)
		}).then(response => response.json())
			.then(responseData => {
				setDataDiamond(responseData)
				props.onDiamondCreated()
			})
	}

    return (
		<>
			<div style={{
				display: 'flex',
				justifyContent: 'flex-end'
			}}>
				<Button variant="contained" type="button" size="large" onClick={handleOpen}>
					Create
				</Button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 800,
						bgcolor: 'background.paper',
						border: '1px solid #000',
						boxShadow: 24,
						p: 4,
					}}>
						<h3 className='titleOfForm'>CREATE Diamond</h3>
						<div>
							<form onSubmit={handleSubmit}>
								<div className='row'>
									<div className='col-6'>
										<TextField type="text" value={origin} onChange={e => setOrigin(e.target.value)}
											id="outlined-basic" label="Origin" variant="outlined" className='form-control' />
									</div>
									<div className='col-12'>
										<FormControl fullWidth>
											<InputLabel id="select-label">Color</InputLabel>
											<Select labelId="select-label"
												id="demo-simple-select" variant="outlined"
												label="Color"
												value={color} onChange={e => setColor(parseInt(e.target.value, 10))}
												className='form-control'
												sx={{
													padding: '0'
												}}>
												<MenuItem value={1}>D</MenuItem>
												<MenuItem value={2}>E</MenuItem>
												<MenuItem value={3}>F</MenuItem>
												<MenuItem value={4}>G</MenuItem>
                                                <MenuItem value={1}>H</MenuItem>
												<MenuItem value={2}>I</MenuItem>
												<MenuItem value={3}>J</MenuItem>
												<MenuItem value={4}>K</MenuItem>
                                                <MenuItem value={1}>L</MenuItem>
												<MenuItem value={2}>M</MenuItem>
												<MenuItem value={3}>N</MenuItem>
												<MenuItem value={4}>O</MenuItem>
                                                <MenuItem value={1}>P</MenuItem>
												<MenuItem value={2}>Q</MenuItem>
												<MenuItem value={3}>R</MenuItem>
												<MenuItem value={4}>S</MenuItem>
                                                <MenuItem value={1}>T</MenuItem>
												<MenuItem value={2}>U</MenuItem>
												<MenuItem value={3}>V</MenuItem>
												<MenuItem value={4}>W</MenuItem>
                                                <MenuItem value={1}>X</MenuItem>
												<MenuItem value={2}>Y</MenuItem>
												<MenuItem value={3}>Z</MenuItem>
											</Select>
										</FormControl>
									</div>
                                    <div className='col-12'>
										<TextField type="text" value={caratWeight} onChange={e => setCaratWeight(e.target.value)}
											id="outlined-basic" label="Carat Weight" variant="outlined" className='form-control' />
									</div>
								</div><br />

								<div className='row'>
                                    <div className='col-12'>
										<FormControl fullWidth>
											<InputLabel id="select-label">Clarity</InputLabel>
											<Select labelId="select-label"
												id="demo-simple-select" variant="outlined"
												label="Clarity"
												value={clarity} onChange={e => setClarity(parseInt(e.target.value, 10))}
												className='form-control'
												sx={{
													padding: '0'
												}}>
												<MenuItem value={1}>FL</MenuItem>
												<MenuItem value={2}>IF</MenuItem>
												<MenuItem value={3}>VVS1</MenuItem>
												<MenuItem value={4}>VVS2</MenuItem>
                                                <MenuItem value={1}>VS1</MenuItem>
												<MenuItem value={2}>VS2</MenuItem>
												<MenuItem value={3}>SI1</MenuItem>
												<MenuItem value={4}>SI2</MenuItem>
                                                <MenuItem value={1}>I1</MenuItem>
												<MenuItem value={2}>I2</MenuItem>
												<MenuItem value={3}>I3</MenuItem>
											</Select>
										</FormControl>
									</div>
                                    <div className='col-12'>
										<FormControl fullWidth>
											<InputLabel id="select-label">Cut</InputLabel>
											<Select labelId="select-label"
												id="demo-simple-select" variant="outlined"
												label="Cut"
												value={cut} onChange={e => setCut(parseInt(e.target.value, 10))}
												className='form-control'
												sx={{
													padding: '0'
												}}>
												<MenuItem value={1}>Excellent</MenuItem>
												<MenuItem value={2}>VeryGood</MenuItem>
												<MenuItem value={3}>Good</MenuItem>
												<MenuItem value={4}>Fair</MenuItem>
                                                <MenuItem value={1}>Poor</MenuItem>
											</Select>
										</FormControl>
									</div>
                                    <div className='col-12'>
										<TextField type="text" value={price} onChange={e => setPrice(e.target.value)}
											id="outlined-basic" label="Price" variant="outlined" className='form-control' />
									</div>
                                    <div className='col-12'>
										<TextField type="text" value={quantity} onChange={e => setQuantity(e.target.value)}
											id="outlined-basic" label="Quantity" variant="outlined" className='form-control' />
									</div>								
								</div><br />
								
								{
									dataDiamond ? (dataDiamond.StatusCode === 400 ? (
										<h3>{dataDiamond.ErrorMessage}</h3>
									) : (
										<h3>Create successful</h3>
									)) : null
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
					</Box>
				</Modal>
			</div>
		</>
	);
}