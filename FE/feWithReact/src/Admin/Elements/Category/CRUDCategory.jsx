import React, { useState, useEffect } from 'react'
import { TextField, Button, styled } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel'
import UpdateIcon from '@mui/icons-material/Update'
import CreateCategory from './CreateCategory'
import DeleteIcon from '@mui/icons-material/Delete'
import { amber } from '@mui/material/colors'
import ButtonDeleteCategory from './ButtonDeleteCategory'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
const UpdateButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(amber[500]),
	backgroundColor: amber[500],
	'&:hover': {
		backgroundColor: amber[700],
	},
}))

export default function CRUDCategory() {
	const [data, setData] = useState(null)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(9)
	const [nameCategory, setnameCategory] = useState(null)
	const [showDelete, setShowDelete] = useState(false)
	const [selectedForDeletion, setSelectedForDeletion] = useState(null)
	const [selectedForUpdate, setSelectedForUpdate] = useState(null)
	const [showUpdate, setShowUpdate] = useState(true)
	const [triggerRead, setTriggerRead] = useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}


	function UpdateCategory(Id, Name) {
		const url = 'https://localhost:7122/api/Category/UpdateCategory/' + Id
		const Data = {
			"name": Name,
			"isDeleted": false
		}
		fetch(url, {
			method: 'PUT',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(Data)
		})
			.then(response => response.json())
			.then(responseData => {
				setData(responseData)
				setShowUpdate(true)
				setTriggerRead(prev => !prev)
			})

	}

	useEffect(() => {
		// Define the Read function inside useEffect or make sure it's defined outside and doesn't change
		function Read() {
			const url = 'https://localhost:7122/api/Category/GetAllCategories';
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(response => response.json())
				.then(responseData => {
					setData(responseData) // Access the array using the key
				})
				.catch((error) => console.error('Error:', error))
		}
		Read()
	}, [triggerRead])


	const handleUpdate = (id) => {
		setSelectedForUpdate(id)
		setShowUpdate(false)
	}

	function handleSubmitUpdate(id, name) {
		UpdateCategory(id, name)
		setSelectedForUpdate(null)
		setnameCategory(null)
	}

	return (
		<>
			<div className='formCRUDContainer'>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell>Name</TableCell>
								<TableCell></TableCell>
								<TableCell><CreateCategory onCategoryCreated={() => setTriggerRead(prev => !prev)} /></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								Array.isArray(data) && data
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((data, index) => (
										<TableRow key={data.id}>
											<TableCell>{index + 1 + page * rowsPerPage}</TableCell>
											<TableCell style={{
												maxWidth: '11vw',
												minWidth: '11vw'
											}}>
												{selectedForUpdate !== data.id && (data.name)}

												{selectedForUpdate === data.id && !showUpdate && (
													<>
														<form onSubmit={() => handleSubmitUpdate(data.id, nameCategory)}>
															<TextField
																required
																defaultValue={data.name}
																onChange={(e) => setnameCategory(e.target.value)}
																id="outlined-basic"
																label="Name"
																variant="outlined"
																sx={{
																	margin: '10px'
																}}
															/> <br />
															<Button
																type="submit"
																value="Submit" variant="contained" color="success"
																size="large" endIcon={<SendIcon />}
																sx={{
																	margin: '5px',
																}}
															>
																Confirm
															</Button>
															<Button type="button"
																value="Clear" onClick={() => {
																	setShowUpdate(!showUpdate)
																	setnameCategory(null)
																	setSelectedForUpdate(null)
																}}
																variant="contained" size="large" color="error"
																endIcon={<CancelIcon />}
																sx={{
																	margin: '5px',
																}}>
																Cancel
															</Button>
														</form>

													</>

												)}
											</TableCell>
											<TableCell style={{
												maxWidth: '11vw',
												minWidth: '11vw'
											}}>
												<ButtonDeleteCategory id={data.id} isDeleted={data.isDeleted}></ButtonDeleteCategory>
											</TableCell>
											<TableCell>
												<UpdateButton onClick={() => handleUpdate(data.id)}
													variant="contained" size="large"
													endIcon={<UpdateIcon />}
													sx={{
														margin: '5px',
														backgroundColor: '#ffc107'
													}}>
													Update
												</UpdateButton>
											</TableCell>
										</TableRow>
									))
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[9]}
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
		</>
	)
}