import React, { useState, useEffect } from 'react'

export default function ReadClarityByID() {
    const [idClarity, setIdClarity] = useState('')
    const [showByIdCW, setShowByIdCW] = useState(false)
    const [data, setData] = useState(null)
    const [context, setContext] = useState('SEARCH BY ID')

    const handleClick = () => {
        setShowByIdCW(!showByIdCW)
        setContext(prevContext => prevContext === 'SEARCH BY ID' ? 'Click again to close SEARCH BY ID' : 'SEARCH BY ID')
    }

    const handleClear = () => {
        setIdClarity('')
        setData('')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (idClarity === '') {
            setData('')
        }
        if (idClarity) {
            const url = 'https://localhost:7122/api/Clarity/Get/' + idClarity;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => response.json())
                .then(responseData => {
                    setData(responseData.data);
                })
                .catch((error) => console.error('Error:', error))
        }
    }



    return (
        <>
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showByIdCW &&
                <div className='formCRUDContainer'>
                    <h3>READ</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idClarity} onChange={e => setIdClarity(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <input type="button" value="Clear" onClick={handleClear} />
                    </form>
                    {data &&
                        <div>
                            <table>
                                <tbody>
                                    <tr key={data.id}>
                                        <td>Name: {data.name}</td>
                                        <td>Color: {data.color}</td>
                                        <td>Price: {data.price}</td>
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