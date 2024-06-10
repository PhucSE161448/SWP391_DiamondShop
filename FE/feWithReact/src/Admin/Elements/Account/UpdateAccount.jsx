import React, { useState, useEffect } from 'react'
import { Button, Modal, Box, TextField, Select, InputLabel, MenuItem, styled, FormControl } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { amber } from '@mui/material/colors'
import UpdateIcon from '@mui/icons-material/Update'
export default function UpdateAccount({ onClick, ...props }) {
	const [idAccount, setIdAccount] = useState('')
	const [nameAccount, setnameAccount] = useState('')
	const [emailAccount, setEmailAccount] = useState('')
	const [genderAccount, setGenderAccount] = useState(null)
	const [phoneAccount, setPhoneAccount] = useState('')
	const [addressAccount, setAddressAccount] = useState('')
	const [data, setData] = useState(null)
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
		setData(null)
	}
	const UpdateButton = styled(Button)(({ theme }) => ({
		color: theme.palette.getContrastText(amber[500]),
		backgroundColor: amber[500],
		'&:hover': {
			backgroundColor: amber[700],
		},
	}))
	const handleSubmit = (event) => {
		event.preventDefault()
		// Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
		updateAccount(idAccount, emailAccount, nameAccount, genderAccount, phoneAccount, addressAccount)
	}

	const handleClear = () => {
		setIdAccount('')
		setnameAccount('')
		setEmailAccount('')
		setGenderAccount(null)
		setPhoneAccount('')
		setAddressAccount('')
		setData(null)
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
				props.onAccountUpdated()
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
			<UpdateButton variant="contained" type="button" size="large"
				onClick={() => { handleOpen(); onClick() }}
				endIcon={<UpdateIcon></UpdateIcon>}>UPDATE</UpdateButton>
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
					<h3 className='titleOfForm'>UPDATE Account</h3>
					<form onSubmit={handleSubmit}>
						<div className='row'>
							<div className='col-12'>
								<TextField disabled type="text" value={props.id}
									id="outlined-basic" label="Id" variant="outlined" className='form-control' />
							</div>
						</div> <br />
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
				</Box>
			</Modal>
		</div>
	)
}
