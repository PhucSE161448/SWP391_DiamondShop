import React, { useState, useEffect } from 'react'
import { Modal, Box, Button, styled } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import { green } from '@mui/material/colors'
export default function ReadAccountByName() {
	const [nameAccount, setNameAccount] = useState('')
	const [data, setData] = useState(null)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setNameAccount('')
		setData(null)
	}

	const handleClear = () => {
		setNameAccount('')
		setData(null)
	}
	const SearchButton = styled(Button)(({ theme }) => ({
		color: theme.palette.getContrastText(green[500]),
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	}))
	const handleSubmit = (event) => {
		event.preventDefault();
		if (nameAccount === '') {
			setData('')
		}
		if (nameAccount) {
			const url = 'https://localhost:7122/api/Account/SearchByName/' + nameAccount;
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(response => response.json())
				.then(responseData => {
					setData(responseData)
				})
				.catch((error) => console.error('Error:', error))
		}
	}

	function getRoleName(roleId) {
		switch (roleId) {
			case 1:
				return 'Admin';
			case 2:
				return 'Sale staff';
			case 3:
				return 'Delivery staff';
			case 4:
				return 'Customer';
		}
	}

	function checkData() {
		return (
			<div>
				<table className='table table-striped table-bordered '>
					<thead>
						<tr>
							<th>Id</th >
							<th>Name</th>
							<th>Email</th>
							<th>Gender</th>
							<th>Phone number</th>
							<th>Role</th>
						</tr >
					</thead >
					<tbody>
						{Array.isArray(data) && data.map(account =>
							<tr>
								<td>
									{account.id}
								</td>
								<td>
									{account.name}
								</td>
								<td>
									{account.email}
								</td>
								<td>
									{account.gender ? "Male" : "Female"}
								</td>
								<td>
									{account.phoneNumber}
								</td>
								<td>
									{getRoleName(account.roleId)}
								</td>
							</tr>
						)
						}
					</tbody>
				</table >
			</div >
		)
	}

	return (
		<div>
			<SearchButton variant="contained" type="button" size="large"
				onClick={handleOpen} endIcon={<PersonSearchIcon></PersonSearchIcon>}>SEARCH BY NAME</SearchButton>
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
					<div className='formCRUDContainer'>
						<h3>SEARCH BY NAME</h3>
						<form onSubmit={handleSubmit}>
							<div>
								<input type="text" value={nameAccount} onChange={e => setNameAccount(e.target.value)} className='form-control' placeholder='Name' />
							</div>
							<div className='formSubmit'>
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
						{checkData()}
					</div>
				</Box>

			</Modal>

		</div >
	)
}