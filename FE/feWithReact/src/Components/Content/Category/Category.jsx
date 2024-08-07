import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, } from '@mui/material'
import { swiffyslider } from 'swiffy-slider'
import "swiffy-slider/css"
import { createApi } from '../../../Auth/AuthFunction'
import CircularProgress from '@mui/material/CircularProgress'
export default function Category() {
	const [CategoryData, setCategoryData] = useState([]);
	const navigate = useNavigate();
	window.swiffyslider = swiffyslider;

	window.addEventListener("load", () => {
		window.swiffyslider.init();
	});

	useEffect(() => {
		function Read() {
			const url = createApi('Category/GetAllCategories')
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': '*/*'
				},
			})
				.then(response => response.json())
				.then(responseData => {
					setCategoryData(responseData)
				})
				.catch((error) => console.error('Error:', error))
		}
		Read()
	}, [])

	const handleNavigateCategory = (id) => {
		navigate(`/category/${id}`)
	}

	return (
		<div className='container-fluid' style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
			fontSize: '2rem',
			color: 'black',
			marginTop: '50px',
			marginBottom: '100px'
		}}>
			<div>
				<h1 className>CATEGORY</h1>
			</div>
			{CategoryData ? (
				<div className='swiffy-slider slider-item-show6 slider-nav-page slider-nav-autoplay slider-nav-autopause slider-nav-dark slider-item-show2-sm'>
					<ul className='slider-container'>
						{CategoryData.filter(item => !item.isDeleted).map((CategoryData) => (
							<li key={CategoryData.id}>
								<div onClick={() => handleNavigateCategory(CategoryData.id)} style={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
									<Card sx={{
										border: '1px solid #000000',
										borderRadius: '50px',
										width: '250px',
										height: '75px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
										<h5>{CategoryData.name}</h5>
									</Card>
								</div>
							</li>
						))}
					</ul>

					<button type='button' className='slider-nav' aria-label='Go left'></button>
					<button type='button' className='slider-nav slider-nav-next' aria-label='Go left'></button>
				</div>
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
