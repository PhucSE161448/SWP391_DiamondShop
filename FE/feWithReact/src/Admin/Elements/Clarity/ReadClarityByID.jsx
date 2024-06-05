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
        setData(null)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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
                    setData(responseData)
                })
                .catch((error) => console.error('Error:', error))
        }
    }

    function checkData() {
        if (data !== null) {
            if (data.isDeleted) {
                return <h3>Clarity is deleted</h3>
            } else {
                return (
                    data ? (data.StatusCode === 404 ? (<h3>Clarity not found</h3>) : (
                        <div>
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Color</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td> {data.name}</td>
                                        <td> {data.color}</td>
                                        <td> {data.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )) : (<div></div>)

                )
            }
        }


    }

    return (
        <div>
            <button className='CRUDButton btn btn-primary btn-lg' onClick={handleClick}>{context}</button>
            {showByIdCW &&
                <div className='formCRUDContainer'>
                    <h3>SEARCH BY ID</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idClarity} onChange={e => setIdClarity(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='formSubmit'>
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>
                    {checkData()}
                </div>
            }

        </div>
    )
}