import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import Modal from '@mui/material/Modal'
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'

export default function CreateDiamondCase(props) {
	const [data, setData] = useState(null)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setData(null)
	}

	const handleClear = () => {
		// setName('')
		// setData(null)
	}

	function Create(values) {
		const url = 'https://localhost:7122/api/DiamondCase/CreateDiamondCase'
		const data = {
			"name": values.name,
			"color": values.color,
			"material": values.material
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(responseData => {
				setData(responseData)
			})
	}
	const validationSchema = Yup.object({
		name: Yup.string().required('Required'),
		color: Yup.string().required('Required'),
		material: Yup.string().required('Required')
	})

	const initialValues = {
		name: '',
		color: '',
		material: ''
	}

	const onSubmit = (values) => {
		Create(values)
		props.onDiamondCaseCreated()
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
					width: 400,
					bgcolor: 'background.paper',
					border: '1px solid #000',
					boxShadow: 24,
					p: 4,
				}}>
					<h3 className='titleOfForm'>CREATE CATEGORY</h3>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
						style={{ width: '100%' }}
					>
						{({ handleChange, values }) => (
							<Form>
								<div className='row'>
									<div className='col-12'>
										<Field
											name="name"
											as={TextField}
											label="Name"
											onChange={handleChange}
											value={values.name}
											style={{ width: '100%' }}
										/>
										<ErrorMessage name="name">
											{msg => <Alert severity="error">{msg}</Alert>}
										</ErrorMessage>
									</div>
								</div> <br />
								<div className='row'>
									<div className='col-12'>
										<Field
											name="color"
											as={TextField}
											label="Color"
											onChange={handleChange}
											value={values.color}
											style={{ width: '100%' }}
										/>
										<ErrorMessage name="color">
											{msg => <Alert severity="error">{msg}</Alert>}
										</ErrorMessage>
									</div>
								</div> <br />
								<div className='row'>
									<div className='col-12'>
										<Field
											name="material"
											as={TextField}
											label="Material"
											onChange={handleChange}
											value={values.material}
											style={{ width: '100%' }}
										/>
										<ErrorMessage name="material">
											{msg => <Alert severity="error">{msg}</Alert>}
										</ErrorMessage>
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
							</Form>
						)}
					</Formik>
				</Box>
			</Modal>
		</div>
	)
}
