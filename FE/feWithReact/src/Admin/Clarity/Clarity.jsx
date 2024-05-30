import React from 'react'
import CreateClarity from './CreateClarity';
import ReadClarity from './ReadClarity';
import ReadClarityByID from './ReadClarityByID';
import UpdateClarity from './UpdateClarity';
import DelelteClarity from './DelelteClarity';
export default function Clarity() {
    return (
        <div className='CRUDContainer'>
            <h2>Clarity</h2>
            <CreateClarity></CreateClarity>
            <ReadClarity></ReadClarity>
            <ReadClarityByID ></ReadClarityByID>
            <UpdateClarity></UpdateClarity>
            <DelelteClarity></DelelteClarity>
        </div>
    )
}
