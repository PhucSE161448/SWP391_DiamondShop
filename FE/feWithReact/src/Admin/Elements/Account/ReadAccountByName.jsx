import React, { useState, useEffect } from 'react'
import { Modal, Box, Button, styled } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import { green } from '@mui/material/colors'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateAccount from './UpdateAccount'
import CancelIcon from '@mui/icons-material/Cancel'
export default function ReadAccountByName(props) {
	const [nameAccount, setNameAccount] = useState('')
	const [data, setData] = useState(null)
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [selectedForDeletion, setSelectedForDeletion] = useState(null)
	const [selectedForUpdate, setSelectedForUpdate] = useState(null)
	const [showDelete, setShowDelete] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setNameAccount('')
		setData(null)
	}
	const columns = [
		{ id: '#', label: '#', align: 'left', },
		{ id: 'Name', label: 'Name', align: 'left', },
		{ id: 'Email', label: 'Email', align: 'left', },
		{ id: 'Gender', label: 'Gender', align: 'left', },
		{ id: 'PhoneNumber', label: 'Phone number', align: 'left', },
		{ id: 'Address', label: 'Address', align: 'left', },
		{ id: 'Role', label: 'Role', align: 'left', },
	]
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
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
					props.onAccountRead()
				})
				.catch((error) => console.error('Error:', error))
		}
	}

	const handleDelete = (id) => {
		setSelectedForDeletion(id)
		setShowDelete(true)
	}

	function handleSubmitDelete(idAccount) {
		if (idAccount) {
			const url = 'https://localhost:7122/api/Account/DeleteUser/' + idAccount
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(responseData => {
					setData(responseData)

					props.onAccountRead()
				})
		}
	}

	const handleUpdate = (id) => {
		setSelectedForUpdate(id)
	}

	function checkData() {
		return (
			<div>
				<TableContainer >
					<Table stickyHeader >
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										sx={{
											fontWeight: 'bold',
											fontSize: '1.2em'
										}}
									>
										{column.label}
									</TableCell>
								))}
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Array.isArray(data) && data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((data, index) => (
									<tr key={data.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>
											{data.name}
										</TableCell>
										<TableCell>
											{data.email}
										</TableCell>
										<TableCell>
											{data.gender ? 'Male' : 'Female'}
										</TableCell>
										<TableCell>
											{data.phoneNumber}
										</TableCell>
										<TableCell>
											{data.address}
										</TableCell>
										<TableCell>
											{data.roleId}
										</TableCell>
										<TableCell>
											<Button variant="outlined" color="error"
												size="large" endIcon={<DeleteIcon />}
												sx={{
													margin: '5px',
													fontWeight: 'bold'
												}} onClick={() => handleDelete(data.id)}>
												DELETE
											</Button>

											{selectedForDeletion === data.id && showDelete && (
												<div>
													<Button
														type="submit"
														value="Submit" variant="contained" color="success"
														size="large" endIcon={<SendIcon />}
														sx={{
															margin: '5px',
														}}
														onClick={() => {
															handleSubmitDelete(data.id)
															handleDelete(data.id)
														}
														}>
														Confirm
													</Button>
													<Button type="button"
														value="Clear" onClick={() => setShowDelete(false)}
														variant="contained" size="large" color="error"
														endIcon={<CancelIcon />}
														sx={{
															margin: '5px',
														}}>
														Cancel
													</Button>
												</div>
											)}
										</TableCell>
										<TableCell>
											<UpdateAccount id={selectedForUpdate}
												email={data.email}
												name={data.name}
												gender={data.gender ? 'Male' : 'Female'}
												phone={data.phoneNumber}
												address={data.address}
												onClick={() => handleUpdate(data.id)}
												onAccountUpdated={() => props.onAccountRead()}></UpdateAccount>
										</TableCell>
									</tr>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={Array.isArray(data) && (data.length)}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				/>
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
					bgcolor: 'background.paper',
					border: '1px solid #000',
					boxShadow: 24,
					p: 4,
					width: 'auto',
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