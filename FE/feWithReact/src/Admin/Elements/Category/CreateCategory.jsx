import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import Modal from '@mui/material/Modal'
import CancelIcon from '@mui/icons-material/Cancel';
import { checkApiStatus, createApi } from '../../../Auth/AuthFunction'
export default function CreateCategory(props) {
	const [dataType, setDataType] = useState(null)
	const [data, setData] = useState(null)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setData(null)
	}

	useEffect(() => {
		const url = createApi('Group/GetAllGroup')
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
		})
			.then(response => response.json())
			.then(responseData => {
				setDataType(responseData)
			})
			.catch((error) => console.error('Error:', error))
	}, [])

	const validationSchema = Yup.object({
		nameCategory: Yup.string().required('Required'),
	})

	const initialValues = {
		nameCategory: '',
		typeCategory: ''
	}

	const onSubmit = (values) => {
		const parsedValues = {
			...values,
			typeCategory: parseInt(values.typeCategory)
		}
		Create(parsedValues)
		// formik.resetForm()
	}


	function Create(Values) {
		const url = createApi('Category/CreateCategory')
		const data = {
			name: Values.nameCategory,
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
		})
			.then(response => checkApiStatus(response))
			.then(responseData => {
				setData(responseData)
				setOpen(false)
				setData(null)
				props.onCategoryCreated()
			})
	}

	return (
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
					overflow: 'auto',
					width: '30%',
				}}>
					<h3 className='titleOfForm'>CREATE CATEGORY</h3>
					<div>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							{({ handleChange, values }) => (
								<Form>
									<div className='row'>
										<div className='col'>
											<Field
												name="nameCategory"
												as={TextField}
												label="Category Name"
												onChange={handleChange}
												value={values.nameCategory}
												style={{ width: '100%' }}
											/>
											<ErrorMessage name="nameCategory">
												{msg => <Alert severity="error">{msg}</Alert>}
											</ErrorMessage>
										</div>
										<div className='formSubmit'>
											<Button
												fullWidth
												variant="contained"
												color="primary"
												type="submit"
												sx={{
													margin: '5px',
												}}
											>
												Save
											</Button>
											<Button
												fullWidth
												variant="contained"
												color="error"
												onClick={handleClose}
												sx={{
													margin: '5px',
												}}
											>
												close
											</Button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</Box>
			</Modal>
		</div>
	)
}
