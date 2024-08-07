import React, { useState, useEffect } from 'react'
import { Button, Modal, Box, TextField, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'
import EditIcon from '@mui/icons-material/Edit'
export default function UpdateAccount(props) {
	const [idAccount, setIdAccount] = useState('')
	const [nameAccount, setnameAccount] = useState('')
	const [emailAccount, setEmailAccount] = useState('')
	const [genderAccount, setGenderAccount] = useState(null)
	const [phoneAccount, setPhoneAccount] = useState('')
	const [addressAccount, setAddressAccount] = useState('')
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setIdAccount('')
		setnameAccount('')
		setEmailAccount('')
		setGenderAccount(null)
		setPhoneAccount('')
		setAddressAccount('')
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		updateAccount(idAccount, emailAccount, nameAccount, genderAccount, phoneAccount, addressAccount)
	}

	const handleClear = () => {
		setIdAccount('')
		setnameAccount('')
		setEmailAccount('')
		setGenderAccount(null)
		setPhoneAccount('')
		setAddressAccount('')
	}
	function updateAccount(Id, Email, Name, Gender, Phone, Address) {
		const url = createApi(`Account/UpdateUser/${Id}`)
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
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
		}).then(response => {
			checkApiStatus(response)
			props.onAccountUpdated()
			handleClose()
		})

	}

	useEffect(() => {
		setIdAccount(props.id)
	}, [props.id])

	useEffect(() => {
		setEmailAccount(props.email)
	}, [props.email])

	useEffect(() => {
		setnameAccount(props.name)
	}, [props.name])

	useEffect(() => {
		setGenderAccount(props.gender === 'Male' ? true : false)
	}, [props.gender])

	useEffect(() => {
		setPhoneAccount(props.phone)
	}, [props.phone])

	useEffect(() => {
		setAddressAccount(props.address)
	}, [props.address])
	// The handleChange and handleSubmit functions remain the same
	const handleEmailChange = (e) => {
		setEmailAccount(e.target.value)
	}

	const handleNameChange = (e) => {
		setnameAccount(e.target.value)
	}

	const handleGenderChange = (e) => {
		setGenderAccount(e.target.value)
	}

	const handlePhoneChange = (e) => {
		setPhoneAccount(e.target.value)
	}

	const handleAddressChange = (e) => {
		setAddressAccount(e.target.value)
	}
	return (
		<div>
			<Button type="button" size="large"
				onClick={handleOpen}
			>
				<EditIcon></EditIcon>
			</Button>
			<Modal open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					border: '1px solid #000',
					boxShadow: 24,
					p: 4,
				}}>
					<h3 className='titleOfForm'>UPDATE ACCOUNT</h3>
					<form onSubmit={handleSubmit}>
						<div className='row'>
							<div className='col-6'>
								<TextField type="text" defaultValue={props.email} onChange={handleEmailChange}
									id="outlined-basic" label="Email" variant="outlined" className='form-control' />
							</div>
							<div className='col-6'>
								<TextField type="text" defaultValue={props.name} onChange={handleNameChange}
									id="outlined-basic" label="Name" variant="outlined" className='form-control' />
							</div>
						</div><br />
						<div className='row'>
							<div className='col-4'>
								<FormControl fullWidth>
									<InputLabel id="select-label">Gender</InputLabel>
									<Select labelId="select-label"
										id="demo-simple-select" variant="outlined"
										label="Gender" defaultValue={props.gender === 'Male' ? true : false}
										onChange={handleGenderChange} className='form-control'
										sx={{
											padding: '0'
										}}>
										<MenuItem value={true}>Male</MenuItem>
										<MenuItem value={false}>Female</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className='col-4'>
								<TextField type="text" defaultValue={props.phone} onChange={handlePhoneChange}
									id="outlined-basic" label="Phone" variant="outlined" className='form-control' />
							</div>
							<div className='col-4'>
								<TextField type="text" defaultValue={props.address} onChange={handleAddressChange}
									id="outlined-basic" label="Address" variant="outlined" className='form-control' />
							</div>
						</div> <br />
						<div className='formSubmit' >
							<Button
								type="submit"
								className='submitButton'
								value="Submit" variant="contained"
								size="large"
								sx={{
									margin: '5px',
								}}>
								Save
							</Button>
							<Button type="button"
								value="Clear"
								className='submitButton'
								variant="contained" size="large" color="error"
								onClick={handleClose}
								sx={{
									margin: '5px',
								}}>
								Cancel
							</Button>
						</div>
					</form>
				</Box>
			</Modal>
		</div>
	)
}
