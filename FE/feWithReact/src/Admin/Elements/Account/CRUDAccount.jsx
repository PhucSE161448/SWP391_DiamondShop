import React, { useState, useEffect } from 'react';
import CreateAccount from './CreateAccount'
import {
	Table, TableBody, TableCell, TableContainer, TableHead, Pagination, TableRow, Stack,
	Grid, FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material'
import UpdateAccount from './UpdateAccount'
import { createApi } from '../../../Auth/AuthFunction'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { jwtDecode } from 'jwt-decode'
import ButtonDeleteAccount from './ButtonDeleteAccount';

export default function CRUDAccount() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const [pageNumber, setPage] = useState(searchParams.get('pageNumber'))
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [data, setData] = useState(null)
	const [triggerRead, setTriggerRead] = useState(false)
	const [order, setOrder] = useState({
		OrderByDesc: searchParams.get('OrderBy') ? searchParams.get('OrderBy') : null,
		SortBy: searchParams.get('SortBy') ? searchParams.get('SortBy') : null
	})
	const [TotalPage, setTotalPage] = useState(null)
	const [roleData, setRoleData] = useState(null)
	const [RoleId, setSelectedRoleId] = useState(searchParams.get('RoleId') ? searchParams.get('RoleId') : null)
	const [searchName, setSearchName] = useState(searchParams.get('Name') ? searchParams.get('Name') : null)
	const [searchEmail, setSearchEmail] = useState(searchParams.get('Email') ? searchParams.get('Email') : null)
	const [userId, setUserId] = useState(Number(jwtDecode(localStorage.getItem('token')).Id))

	const columns = [
		{ id: 'Name', label: 'Name', align: 'left', },
		{ id: 'Email', label: 'Email', align: 'left', },
		{ id: 'Gender', label: 'Gender', align: 'left', },
		{ id: 'PhoneNumber', label: 'Phone number', align: 'left', },
		{ id: 'Address', label: 'Address', align: 'left', },
		{ id: 'Role', label: 'Role', align: 'left', },
		{ id: 'Status', label: 'Status', align: 'left', },
		{ id: 'Action', label: 'Action', align: 'left', },
	]

	const params = {
		queryDTO: {
			PageNumber: pageNumber,
			PageSize: rowsPerPage,
			...(order.OrderByDesc !== null && { OrderByDesc: order.OrderByDesc }),
			...(order.SortBy !== null && { SortBy: order.SortBy }),
			...(RoleId !== null && { RoleId: RoleId }),
			...(searchName !== null && { Name: searchName }),
			...(searchEmail !== null && { Email: searchEmail }),
		},
	}

	const ITEM_HEIGHT = 120
	const ITEM_PADDING_TOP = 8
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			},
		},
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
		setTriggerRead(prev => !prev)
	}

	const handleChangeOrder = (value) => {
		setOrder((prev) => ({ ...prev, OrderByDesc: value.OrderByDesc, SortBy: value.SortBy }))
		navigate(`/admin/account?pageNumber=1&OrderBy=${value.OrderByDesc || ''}&SortBy=${value.SortBy || ''}&Name=${searchName || ''}&Email=${searchEmail || ''}&RoleId=${RoleId || ''}`)
		setTriggerRead((prev) => !prev)
	}

	const handleChangeRole = (value) => {
		setSelectedRoleId(value)
		navigate(`/admin/account?pageNumber=1&OrderBy=${order.OrderBy || ''}&SortBy=${order.SortBy || ''}&Name=${searchName || ''}&Email=${searchEmail || ''}&RoleId=${value || ''}`)
		setTriggerRead((prev) => !prev)
	}

	const debounce = (func, delay) => {
		let debounceTimer
		return function () {
			const context = this
			const args = arguments
			clearTimeout(debounceTimer)
			debounceTimer = setTimeout(() => func.apply(context, args), delay)
		}
	}

	const handleChangeName = (newValue) => {
		navigate(`/admin/account?pageNumber=1&OrderBy=${order.OrderBy || ''}&SortBy=${order.SortBy || ''}&Name=${newValue || ''}&Email=${searchEmail || ''}&RoleId=${RoleId || ''}`)
		setData(null)
		setSearchName(newValue)
		setTriggerRead((prev) => !prev)
	}

	const handleChangeEmail = (newValue) => {
		navigate(`/admin/account?pageNumber=1&OrderBy=${order.OrderBy || ''}&SortBy=${order.SortBy || ''}&Name=${searchName || ''}&Email=${newValue || ''}&RoleId=${RoleId || ''}`)
		setData(null)
		setSearchEmail(newValue)
		setTriggerRead((prev) => !prev)
	}

	const debouncedHandleChangeName = debounce(handleChangeName, 500)
	const debouncedHandleChangeEmail = debounce(handleChangeEmail, 500)

	useEffect(() => {
		// Define the Read function inside useEffect or make sure it's defined outside and doesn't change
		function Read() {
			let queryString = new URLSearchParams()
			Object.entries(params.queryDTO).forEach(([key, value]) => {
				if (key === 'Name') { // Check if value is an array
					queryString.append(`${key}`, value);
				} else if (key === 'RoleId') {
					queryString.append(`${key}`, value);
				} else if (key === 'Email') {
					queryString.append(`${key}`, value);
				} else {
					queryString.append(`QueryDTO.${key}`, value);
				}
			})
			const url = createApi(`Account/GetPagedAccounts?${queryString.toString()}`)
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': '*/*',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
			})
				.then(response => response.json())
				.then(responseData => {
					setData(responseData.items)
					setTotalPage(Math.ceil(responseData.totalItemsCount / rowsPerPage))
				})
				.catch((error) => console.error('Error:', error))
		}
		Read()
	}, [triggerRead])

	useEffect(() => {
		const url = createApi('Role/GetAllRoles')
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
		})
			.then(response => response.json())
			.then(responseData => {
				setRoleData(responseData)
			})
	}, [])

	return (
		<div className='formCRUDContainer'>
			<div>
				<Grid container spacing={2} sx={{
					paddingTop: '20px',
					paddingBottom: '20px',
					margin: '0px',
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
				}}>
					<Grid xs={2} sm={2} md={2} sx={{
						margin: '20px',
					}}>
						<FormControl fullWidth>
							<InputLabel>
								Order
							</InputLabel>
							<Select
								label="Order"
								MenuProps={MenuProps}
								value={order.OrderByDesc !== null && order.SortBy ? `${String(order.OrderByDesc)},${order.SortBy}` : 'Default'}
								onChange={(e) => {
									const value = e.target.value;
									if (value === 'Default') {
										handleChangeOrder({ OrderByDesc: null, SortBy: null });
									} else {
										const [orderByDesc, sortBy] = value.split(',');
										handleChangeOrder({ OrderByDesc: orderByDesc === 'true', SortBy: sortBy });
									}
								}}
							>
								<MenuItem value="false,Name">Ascending by name</MenuItem>
								<MenuItem value="true,Name">Descending by name</MenuItem>
								<MenuItem value="false,modified date">Ascending by modified date</MenuItem>
								<MenuItem value="true,modified date">Descending by modified date</MenuItem>
								<MenuItem value="false,created date">Ascending by created date</MenuItem>
								<MenuItem value="true,created date">Descending by created date</MenuItem>
								<MenuItem value="Default">Default</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid xs={2} sm={2} md={2} sx={{
						margin: '20px',
					}}>
						<FormControl fullWidth>
							<InputLabel>
								Role
							</InputLabel>
							<Select
								label="Role"
								MenuProps={MenuProps}
								value={RoleId ? RoleId : 'Default'}
								onChange={(e) => {
									const value = e.target.value;
									if (value === 'Default') {
										handleChangeRole(null)
									} else {
										handleChangeRole(value)
									}
								}}
							>
								{roleData && roleData.map((role) => (
									<MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
								))}
								<MenuItem value="Default">Default</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid xs={2} sm={2} md={2} sx={{
						margin: '20px',
					}}>
						<FormControl fullWidth>
							<TextField
								label="Search by name"
								onChange={(e) => debouncedHandleChangeName(e.target.value)}
							/>
						</FormControl>
					</Grid>
					<Grid xs={2} sm={2} md={2} sx={{
						margin: '20px',
					}}>
						<FormControl fullWidth>
							<TextField
								label="Search by email"
								onChange={(e) => debouncedHandleChangeEmail(e.target.value)}
							/>
						</FormControl>
					</Grid>
				</Grid>
			</div>
			{data ? (
				<>
					<div style={{
						display: 'flex',
						justifyContent: 'flex-end',
						margin: '10px',
					}}>
						<div><CreateAccount onAccountCreated={() => setTriggerRead(prev => !prev)}></CreateAccount></div>
					</div>
					<TableContainer>
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

								</TableRow>
							</TableHead>
							<TableBody>
								{data && data
									.map((data, index) => (
										<>
											{data.id !== userId && (
												<TableRow key={data.id}>
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
														{data.role?.name}
													</TableCell>
													<TableCell>
														<ButtonDeleteAccount id={data.id} isDeleted={data.isDeleted} onAccountDeleted={() => setTriggerRead(prev => !prev)}></ButtonDeleteAccount>
													</TableCell>
													<TableCell>
														<UpdateAccount id={data.id}
															email={data.email}
															name={data.name}
															gender={data.gender}
															phone={data.phoneNumber}
															address={data.address}
															onAccountUpdated={() => setTriggerRead(prev => !prev)}></UpdateAccount>
													</TableCell>
												</TableRow>
											)}
										</>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<Stack sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<Pagination count={TotalPage} page={pageNumber} onChange={handleChangePage} />
					</Stack>
				</>
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
		</div>
	)
}
