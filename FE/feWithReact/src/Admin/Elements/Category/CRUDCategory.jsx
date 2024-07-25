import React, { useState, useEffect } from 'react'
import CreateCategory from './CreateCategory'
import ButtonDeleteCategory from './ButtonDeleteCategory'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CircularProgress } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import UpdateCategory from './UpdateCategory'
import { useSearchParams, useNavigate } from 'react-router-dom'
export default function CRUDCategory() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const pageNumber = searchParams.get('pageNumber') - 1 || 0
	const [data, setData] = useState(null)
	const [page, setPage] = useState(pageNumber)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [triggerRead, setTriggerRead] = useState(false);

	const handleChangePage = (event, newPage) => {
		navigate(`/admin/category?pageNumber=${newPage + 1}`)
		setPage(newPage)
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

	const tableHead = ['Name', 'Status', 'Action']
	return (
		<>
			{data ? (
				<div className='formCRUDContainer'>
					<div>
						<CreateCategory onCategoryCreated={() => setTriggerRead(prev => !prev)} />
					</div>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									{tableHead.map((head, index) => (
										<TableCell key={index} sx={{
											fontWeight: 'bold',
											fontSize: '20px',
										}}>{head}</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{
									Array.isArray(data) && data
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((data, index) => (
											<TableRow key={data.id}>
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
						rowsPerPageOptions={[10, 20, 30]}
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
			) : (
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '50vh',
					width: '100%',
				}}>
					<CircularProgress />
				</div>
			)}
		</>
	)
}