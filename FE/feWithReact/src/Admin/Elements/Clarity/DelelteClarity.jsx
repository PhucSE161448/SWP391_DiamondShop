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
            <button className='CRUDButton btn btn-danger btn-lg' onClick={handleClick}>{context}</button>
            {showByIdClarity &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>DELETE CLARITY</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idClarity} onChange={e => setIdClarity(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='formSubmit' >
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>

                </div>
            }
        </>
    )
}
