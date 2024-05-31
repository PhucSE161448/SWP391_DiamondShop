import React from 'react'
import CreateClarity from './CreateClarity';
import ReadClarity from './ReadClarity';
import ReadClarityByID from './ReadClarityByID';
import UpdateClarity from './UpdateClarity';
import DelelteClarity from './DelelteClarity';
import NavbarAdmin from '../../Navbar/NavbarAdmin';
export default function Clarity() {
    return (
        <div >
            <div>
                <NavbarAdmin></NavbarAdmin>
            </div>
            <div className='CRUDContainer '>
                <div className='titleOfFormContainer'>
                    <h2>Clarity</h2>
                </div>
                <div className='buttonContainer'>
                    <CreateClarity></CreateClarity>
                    <ReadClarity></ReadClarity>
                    <ReadClarityByID ></ReadClarityByID>
                    <UpdateClarity></UpdateClarity>
                    <DelelteClarity></DelelteClarity>
                </div>
            </div>

        </div>
    )
}
