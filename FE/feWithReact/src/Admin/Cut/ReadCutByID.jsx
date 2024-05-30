import React, { useState, useEffect } from 'react'

export default function ReadCutByID() {
    const [idCut, setIdCut] = useState('')
    const [showByIdCut, setShowByIdCut] = useState(false)
    const [dataCut, setDataCut] = useState(null)
    const [context, setContext] = useState('SEARCH BY ID')

    const handleClick = () => {
        setShowByIdCut(!showByIdCut)
        setContext(prevContext => prevContext === 'SEARCH BY ID' ? 'Click again to close SEARCH BY ID' : 'SEARCH BY ID')
    }

    const handleClear = () => {
        setIdCut('')
        setDataCut('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idCut === '') {
            setDataCut('')
        }
        if (idCut) {
            const url = 'https://localhost:7122/api/Cut/Get/' + idCut
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => response.json())
                .then(responseData => {
                    if (responseData.data) {
                        setDataCut(responseData.data)
                    } else {
                        setDataCut(null)
                    }
                })
                .catch((error) => console.error('Error:', error))
        }
    }

    return (
        <>
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showByIdCut &&
                <div className='formCRUDContainer'>
                    <h3>SEARCH BY ID</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idCut} onChange={e => setIdCut(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <input type="button" value="Clear" onClick={handleClear} />
                    </form>
                    {dataCut &&
                        <div>
                            <table>
                                <tbody>
                                    <tr key={dataCut.id}>
                                        <td>Name: {dataCut.name}</td>
                                        <td>Price: {dataCut.price}</td>
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