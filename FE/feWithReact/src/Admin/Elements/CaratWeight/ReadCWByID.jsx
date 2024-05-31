import React, { useState, useEffect } from 'react'

export default function ReadCWByID() {
    const [idCW, setIdCW] = useState('')
    const [showByIdCW, setShowByIdCW] = useState(false)
    const [dataCW, setDataCW] = useState(null)
    const [context, setContext] = useState('SEARCH BY ID')

    const handleClick = () => {
        setShowByIdCW(!showByIdCW)
        setContext(prevContext => prevContext === 'SEARCH BY ID' ? 'Click again to close SEARCH BY ID' : 'SEARCH BY ID')

    }

    const handleClear = () => {
        setIdCW('')
        setDataCW('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idCW === '') {
            setDataCW('')
        }
        if (idCW) {
            const url = 'https://localhost:7122/api/CaratWeight/Get/' + idCW
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => response.json())
                .then(responseData => {
                    setDataCW(responseData.data)
                })
                .catch((error) => console.error('Error:', error))
        }
    }



    return (
        <div>
            <button className='CRUDButton btn btn-primary btn-lg' onClick={handleClick}>{context}</button>
            {showByIdCW &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>SEARCH BY ID</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='formSubmit'>
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>
                    {dataCW &&
                        <div >
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Weight</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={dataCW.id}>
                                        <td>{dataCW.id}</td>
                                        <td> {dataCW.weight}</td>
                                        <td> {dataCW.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    }
                </div>
            }
        </div>
    )
}