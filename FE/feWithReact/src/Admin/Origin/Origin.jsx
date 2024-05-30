import React from 'react'
import CreateOrigin from './CreateOrigin';
import ReadOrigin from './ReadOrigin';
import ReadOriginByID from './ReadOriginByID';
import UpdateOrigin from './UpdateOrigin';
import DelelteOrigin from './DelelteOrigin';
export default function Origin() {
    return (
        <div className='CRUDContainer'>
            <h2>Origin</h2>
            <CreateOrigin></CreateOrigin>
            <ReadOrigin></ReadOrigin>
            <ReadOriginByID ></ReadOriginByID>
            <UpdateOrigin></UpdateOrigin>
            <DelelteOrigin></DelelteOrigin>
        </div>
    )
}
