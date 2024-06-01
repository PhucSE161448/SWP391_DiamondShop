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
        <div>
            <button className='CRUDButton btn btn-danger btn-lg' onClick={handleClick}>{context}</button>
            {showByIdCW &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>DELETE CARAT WEIGHT</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='formSubmit' >
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>

                </div>
            }
        </div>
    )
}
