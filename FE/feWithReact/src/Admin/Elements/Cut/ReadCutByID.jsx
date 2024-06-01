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
            <button className='CRUDButton btn btn-primary btn-lg' onClick={handleClick}>{context}</button>
            {showByIdCut &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>SEARCH BY ID</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idCut} onChange={e => setIdCut(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='formSubmit'>
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>
                    {dataCut &&
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
                                    <tr key={dataCut.id}>
                                        <td>{dataCut.id}</td>
                                        <td> {dataCut.name}</td>
                                        <td> {dataCut.price}</td>
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