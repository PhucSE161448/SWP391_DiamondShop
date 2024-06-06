import React from 'react'
import CreateOrigin from './CreateOrigin';
import ReadOrigin from './ReadOrigin';
import ReadOriginByID from './ReadOriginByID';
import UpdateOrigin from './UpdateOrigin';
import DelelteOrigin from './DelelteOrigin';
import NavbarAdmin from '../../Navbar/NavbarAdmin';
export default function Origin() {
    return (
        <div >
            <div>
                <NavbarAdmin></NavbarAdmin>
            </div>
            <div className='CRUDContainer'>
                <div className='titleOfFormContainer'>
                    <h2>Origin</h2>
                </div>
                <div className='buttonContainer'>
                    <CreateOrigin></CreateOrigin>
                    <ReadOrigin></ReadOrigin>
                    <ReadOriginByID ></ReadOriginByID>
                    <UpdateOrigin></UpdateOrigin>
                    <DelelteOrigin></DelelteOrigin>
                </div>
            </div>
        </div>
    )
}