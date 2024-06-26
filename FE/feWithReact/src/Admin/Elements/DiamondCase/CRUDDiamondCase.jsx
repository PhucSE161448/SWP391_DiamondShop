import React, { useState, useEffect } from 'react'
import { Button, styled } from '@mui/material'
import CreateCategory from './CreateDiamondCase'
import { amber } from '@mui/material/colors'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import ButtonDeleteDiamondCase from './ButtonDeleteDiamondCase'
import UpdateDiamondCase from './UpdateDiamondCase'

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
			const url = 'https://localhost:7122/api/DiamondCase/GetAllDiamondCases';
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
								<TableCell><CreateCategory onDiamondCaseCreated={() => setTriggerRead(prev => !prev)} /></TableCell>
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
												<ButtonDeleteDiamondCase id={data.id} isDeleted={data.isDeleted} />
											</TableCell>
											<TableCell>
												<UpdateDiamondCase id={data.id} onDiamondCaseUpdated={() => setTriggerRead(prev => !prev)}></UpdateDiamondCase>
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