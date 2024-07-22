import React, { useState } from 'react'
import { Button, Modal, Box, TextField, Select, InputLabel, MenuItem, OutlinedInput, FormControl } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import { createApi } from '../../../Auth/AuthFunction'
import { checkApiStatus } from '../../../Auth/AuthFunction'
export default function CreateAccount(props) {
	const [nameAccount, setnameAccount] = useState('')
	const [emailAccount, setEmailAccount] = useState('')
	const [genderAccount, setGenderAccount] = useState(null)
	const [passwordAccount, setPasswordAccount] = useState('')
	const [addressAccount, setAddressAccount] = useState('')
	const [phoneAccount, setPhoneAccount] = useState('')
	const [roleAccount, setRoleAccount] = useState(null)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setnameAccount('')
		setEmailAccount('')
		setAddressAccount('')
		setGenderAccount(null)
		setPasswordAccount('')
		setPhoneAccount('')
		setRoleAccount(null)
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		CreateAccount(emailAccount, passwordAccount, nameAccount, addressAccount, genderAccount, passwordAccount, roleAccount)
		setnameAccount('')
		setEmailAccount('')
		setAddressAccount('')
		setGenderAccount(null)
		setPasswordAccount('')
		setPhoneAccount('')
		setRoleAccount(null)
	}

	const handleClear = () => {
		setnameAccount('')
		setEmailAccount('')
		setAddressAccount('')
		setGenderAccount(null)
		setPasswordAccount('')
		setPhoneAccount('')
		setRoleAccount(null)
	}

	function CreateAccount(Email, Password, Name, Address, Gender, Phone, Role) {
		const url = createApi('Account/CreateUser')
		const data = {
			name: Name,
			email: Email,
			address: Address,
			gender: Gender,
			password: Password,
			phoneNumber: Phone,
			roleId: Role
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json-patch+json',
				'Accept': '*/*',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
		}).then(response => checkApiStatus(response))
			.then(() => {
				handleClose()
				props.onAccountCreated()
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
						bgcolor: 'background.paper',
						border: '1px solid #000',
						boxShadow: 24,
						p: 4,
						width: '50%	',
						overflow: 'auto'
					}}>
						<h3 className='titleOfForm'>CREATE Account</h3>
						<div>
							<form onSubmit={handleSubmit}>
								<div className='row'>
									<div className='col-6'>
										<TextField type="text" value={emailAccount} onChange={e => setEmailAccount(e.target.value)}
											id="outlined-basic" label="Email" variant="outlined" className='form-control' />
									</div>
									<div className='col-6'>
										<TextField type="password" value={passwordAccount} onChange={e => setPasswordAccount(e.target.value)}
											id="outlined-basic" label="Password" variant="outlined" className='form-control' />
									</div>
								</div><br />
								<div className='row'>
									<div className='col-12'>
										<TextField type="text" value={nameAccount} onChange={e => setnameAccount(e.target.value)}
											id="outlined-basic" label="Name" variant="outlined" className='form-control' />
									</div>
								</div> <br />
								<div className='row'>
									<div className='col-4'>
										<FormControl fullWidth>
											<InputLabel id="select-label">Gender</InputLabel>
											<Select labelId="select-label"
												id="demo-simple-select" variant="outlined"
												label="Gender" value={genderAccount}
												onChange={e => setGenderAccount(e.target.value === "true")} className='form-control'
												sx={{
													padding: '0'
												}}>
												<MenuItem value={true}>Male</MenuItem>
												<MenuItem value={false}>Female</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className='col-4'>
										<TextField type="text" value={phoneAccount} onChange={e => setPhoneAccount(e.target.value)}
											id="outlined-basic" label="Phone" variant="outlined" className='form-control' />
									</div>
									<div className='col-4'>
										<TextField type="text" value={addressAccount} onChange={e => setAddressAccount(e.target.value)}
											id="outlined-basic" label="Address" variant="outlined" className='form-control' />
									</div>
								</div> <br />
								<div className='row'>
									<div className='col-12'>
										<FormControl fullWidth>
											<InputLabel id="select-label">Role</InputLabel>
											<Select labelId="select-label"
												id="demo-simple-select" variant="outlined"
												label="Role"
												value={roleAccount} onChange={e => setRoleAccount(parseInt(e.target.value, 10))}
												className='form-control'
												sx={{
													padding: '0'
												}}>
												<MenuItem value={1}>Admin</MenuItem>
												<MenuItem value={2}>Manager</MenuItem>
												<MenuItem value={3}>Sale staff</MenuItem>
												<MenuItem value={4}>Delivery staff</MenuItem>
												<MenuItem value={5}>Customer</MenuItem>
											</Select>
										</FormControl>

									</div>
								</div>
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
										onClick={handleClose}
										className='submitButton'
										variant="contained" size="large" color="error"
										endIcon={<CancelScheduleSendIcon />}
										sx={{
											margin: '5px',
										}}>
										Cancel
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