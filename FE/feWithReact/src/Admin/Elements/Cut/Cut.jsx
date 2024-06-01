import React from 'react'
import CreateCut from './CreateCut';
import ReadCut from './ReadCut';
import ReadCutByID from './ReadCutByID';
import UpdateCut from './UpdateCut';
import DelelteCut from './DelelteCut';
import NavbarAdmin from '../../Navbar/NavbarAdmin';
export default function Cut() {
    return (
        <div>
            <div>
                <NavbarAdmin></NavbarAdmin>
            </div>
            <div className='CRUDContainer'>
                <div className='titleOfFormContainer'>
                    <h2>Cut</h2>
                </div>
                <div className='buttonContainer'>
                    <CreateCut></CreateCut>
                    <ReadCut></ReadCut>
                    <ReadCutByID ></ReadCutByID>
                    <UpdateCut></UpdateCut>
                    <DelelteCut></DelelteCut>
                </div>
            </div>


        </div>
    )
}
