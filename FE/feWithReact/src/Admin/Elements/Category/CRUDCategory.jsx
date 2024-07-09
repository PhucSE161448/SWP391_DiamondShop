import React, { useState, useEffect } from 'react'
import { TextField, Button, styled } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel'
import UpdateIcon from '@mui/icons-material/Update'
import CreateCategory from './CreateCategory'
import { amber } from '@mui/material/colors'
import ButtonDeleteCategory from './ButtonDeleteCategory'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import UpdateCategory from './UpdateCategory'

export default function CRUDCategory() {
	const [data, setData] = useState(null)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(9)
	const [triggerRead, setTriggerRead] = useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	useEffect(() => {
		// Define the Read function inside useEffect or make sure it's defined outside and doesn't change
		function Read() {
			const url = createApi('Category/GetAllCategories')
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': '*/*',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
			})
				.then(response => response.json())
				.then(responseData => {
					setData(responseData)
				})
				.catch((error) => console.error('Error:', error))
		}
		Read()
	}, [triggerRead])

	return (
		<>
			<div className='formCRUDContainer'>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Type</TableCell>
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
												{data.name}
											</TableCell>
											<TableCell style={{
												maxWidth: '11vw',
												minWidth: '11vw'
											}}>
												{data.group.name}
											</TableCell>
											<TableCell style={{
												maxWidth: '11vw',
												minWidth: '11vw'
											}}>
												<ButtonDeleteCategory id={data.id} isDeleted={data.isDeleted}></ButtonDeleteCategory>
											</TableCell>
											<TableCell>
												<UpdateCategory data={data} onUpdateCategory={() => setTriggerRead(prev => !prev)}></UpdateCategory>
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