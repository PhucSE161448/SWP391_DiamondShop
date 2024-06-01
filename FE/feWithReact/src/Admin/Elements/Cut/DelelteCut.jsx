import React, { useState } from 'react'

export default function DelelteCut() {
    const [idCut, setIdCut] = useState('')
    const [showByIdCut, setShowByIdCut] = useState(false)
    const [context, setContext] = useState('DELETE')

    const handleClick = () => {
        setShowByIdCut(!showByIdCut)
        setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close' : 'DELETE')
    }

    const handleClear = () => {
        setId('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idCut) {
            const url = 'https://localhost:7122/api/Cut/Delete/' + idCut
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
            {showByIdCut &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>DELETE CUT</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idCut} onChange={e => setIdCut(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='formSubmit'>
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>

                </div>
            }
        </>
    )
}
