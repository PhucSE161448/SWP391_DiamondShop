import React from 'react'
import CreateCategory from './CreateCategory';
import ReadClarity from './ReadCategory';
import ReadClarityByID from './ReadCategoryByID';
import UpdateClarity from './UpdateCategory';
import DelelteClarity from './DeleteCategory';


export default function Category() {
	return (
		<div className='contentAdminContainer'>
			<div className='CRUDContainer '>
				<div className='titleOfFormContainer'>
					<h2>Category</h2>
				</div>
				<div className='buttonContainer'>
					<CreateCategory></CreateCategory>
					<ReadClarity></ReadClarity>
					<ReadClarityByID ></ReadClarityByID>
					<UpdateClarity></UpdateClarity>
					<DelelteClarity></DelelteClarity>
				</div>
			</div>
		</div>
	)
}
