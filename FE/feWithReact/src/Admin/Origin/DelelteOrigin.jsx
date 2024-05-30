import React, { useState } from 'react'

export default function DelelteOrigin() {
    const [idOrigin, setIdOrigin] = useState('')
    const [showByIdOrigin, setShowByIdOrigin] = useState(false)
    const [data, setData] = useState(null)
    const [context, setContext] = useState('DELETE')

    const handleClick = () => {
        setShowByIdOrigin(!showByIdOrigin)
        setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close' : 'DELETE')
    }

    const handleClear = () => {
        setId('')
        setData('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idOrigin) {
            const url = 'https://localhost:7122/api/Origin/Delete/' + idOrigin
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.success) {
                        window.alert('DELETE SUCCESSFUL')
                    } else {
                        window.alert('FAIL')
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
                    <h3>DELETE</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idOrigin} onChange={e => setIdOrigin(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <input type="button" value="Clear" onClick={handleClear} />
                    </form>

                </div>
            }
            {data &&
                <div>
                    <table>
                        <tr key={data.id}>
                            <td>Weight: {data.weight}</td>
                            <td>Price: {data.price}</td>
                        </tr>
                    </table>
                </div>
            }
        </>
    )
}
