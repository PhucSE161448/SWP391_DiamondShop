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
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showByIdOrigin &&
                <div className='formCRUDContainer'>
                    <h3>SEARCH BY ID</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idOrigin} onChange={e => setIdOrigin(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <input type="button" value="Clear" onClick={handleClear} />
                    </form>
                    {dataOrigin &&
                        <div>
                            <table>
                                <tbody>
                                    <tr key={dataOrigin.id}>
                                        <td>Name: {dataOrigin.name}</td>
                                        <td>Price: {dataOrigin.price}</td>
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