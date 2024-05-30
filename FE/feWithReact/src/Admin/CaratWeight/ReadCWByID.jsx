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
        <>
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showByIdCW &&
                <div className='formCRUDContainer'>
                    <h3>SEARCH BY ID</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <input type="button" value="Clear" onClick={handleClear} />
                    </form>
                    {dataCW &&
                        <div >
                            <table>
                                <tbody>
                                    <tr key={dataCW.id}>
                                        <td>Weight: {dataCW.weight}</td>
                                        <td>Price: {dataCW.price}</td>
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