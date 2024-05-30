import React from 'react'
import CreateCut from './CreateCut';
import ReadCut from './ReadCut';
import ReadCutByID from './ReadCutByID';
import UpdateCut from './UpdateCut';
import DelelteCut from './DelelteCut';
export default function Cut() {
    return (
        <div className='CRUDContainer'>
            <h2>Cut</h2>
            <CreateCut></CreateCut>
            <ReadCut></ReadCut>
            <ReadCutByID ></ReadCutByID>
            <UpdateCut></UpdateCut>
            <DelelteCut></DelelteCut>
        </div>
    )
}
