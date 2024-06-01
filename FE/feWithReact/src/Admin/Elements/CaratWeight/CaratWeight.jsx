import React from 'react'
import CreateCW from './CreateCW';
import ReadCW from './ReadCW';
import ReadCWByID from './ReadCWByID';
import UpdateCW from './UpdateCW';
import DelelteCW from './DelelteCW';
import NavbarAdmin from '../../Navbar/NavbarAdmin';
export default function CaratWeight() {
    return (
        <div >
            <div>
                <NavbarAdmin></NavbarAdmin>
            </div>
            <div className='CRUDContainer'>
                <div className='titleOfFormContainer'>
                    <h2>CaratWeight</h2>
                </div>
                <div className='buttonContainer'>
                    <CreateCW></CreateCW>
                    <ReadCW></ReadCW>
                    <ReadCWByID ></ReadCWByID>
                    <UpdateCW></UpdateCW>
                    <DelelteCW></DelelteCW>
                </div>
            </div>

        </div>
    )
}
