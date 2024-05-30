import React, { useState } from 'react'

export default function DelelteCW() {
    const [idCW, setIdCW] = useState('')
    const [showByIdCW, setShowByIdCW] = useState(false)
    const [context, setContext] = useState('DELETE')

    const handleClick = () => {
        setShowByIdCW(!showByIdCW)
        setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close' : 'DELETE')
    }

    const handleClear = () => {
        setIdCW('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idCW) {
            const url = 'https://localhost:7122/api/CaratWeight/Delete/' + idCW
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
                        setIdCW('')
                    } else {
                        window.alert('FAIL')
                        setIdCW('')
                    }
                })
                .catch((error) => console.error('Error:', error))
        }
    }



    return (
        <>
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showByIdCW &&
                <div className='formCRUDContainer'>
                    <h3>DELETE</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <input type="button" value="Clear" onClick={handleClear} />
                    </form>

                </div>
            }
        </>
    )
}
