import React, { useState, useEffect } from 'react'

export default function ReadOriginByID() {
    const [idOrigin, setIdOrigin] = useState('')
    const [showByIdOrigin, setShowByIdOrigin] = useState(false)
    const [dataOrigin, setDataOrigin] = useState(null)
    const [context, setContext] = useState('SEARCH BY ID')

    const handleClick = () => {
        setShowByIdOrigin(!showByIdOrigin)
        setContext(prevContext => prevContext === 'SEARCH BY ID' ? 'Click again to close SEARCH BY ID' : 'SEARCH BY ID')
    }

    const handleClear = () => {
        setIdOrigin('')
        setDataOrigin('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idOrigin === '') {
            setDataOrigin('')
        }
        if (idOrigin) {
            const url = 'https://localhost:7122/api/Origin/Get/' + idOrigin
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => response.json())
                .then(responseData => {
                    if (responseData.data) {
                        setDataOrigin(responseData.data)
                    } else {
                        setDataOrigin(null)
                    }
                })
                .catch((error) => console.error('Error:', error))
        }
    }

    return (
        <>
            <button className='CRUDButton btn btn-primary btn-lg' onClick={handleClick}>{context}</button>
            {showByIdOrigin &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>SEARCH BY ID</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idOrigin} onChange={e => setIdOrigin(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='formSubmit'>
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>
                    {dataOrigin &&
                        <div>
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={dataOrigin.id}>
                                        <td>{dataOrigin.id}</td>
                                        <td> {dataOrigin.name}</td>
                                        <td> {dataOrigin.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            }

        </>
    )
}