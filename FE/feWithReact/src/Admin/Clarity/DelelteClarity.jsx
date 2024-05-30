import React, { useState } from 'react'

export default function DelelteClarity() {
    const [idClarity, setIdClarity] = useState('')
    const [showByIdClarity, setShowByIdClarity] = useState(false)
    const [context, setContext] = useState('DELETE')

    const handleClick = () => {
        setShowByIdClarity(!showByIdClarity)
        setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close DELETE' : 'DELETE')
    }

    const handleClear = () => {
        setIdClarity('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idClarity) {
            const url = 'https://localhost:7122/api/Clarity/Delete/' + idClarity
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
            {showByIdClarity &&
                <div className='formCRUDContainer'>
                    <h3>DELETE</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idClarity} onChange={e => setIdClarity(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <input type="button" value="Clear" onClick={handleClear} />
                    </form>

                </div>
            }
        </>
    )
}
