import React, { useState } from 'react'

export default function UpdateOrigin() {
    const [idOrigin, setIdOrigin] = useState('')
    const [nameOrigin, setNameOrigin] = useState('')
    const [priceOrigin, setPriceOrigin] = useState('')
    const [showUpdateOrigin, setShowUpdateOrigin] = useState(false)
    const [context, setContext] = useState('UPDATE')

    const handleClick = () => {
        setShowUpdateOrigin(!showUpdateOrigin)
        setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close' : 'UPDATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        UpdateOrigin(idOrigin, nameOrigin, priceOrigin)
    }

    const handleClear = () => {
        setIdOrigin('')
        setNameOrigin('')
        setPriceOrigin('')
    }

    function UpdateOrigin(Id, Name, Price) {
        const url = 'https://localhost:7122/api/Origin/Update/' + idOrigin;
        const formData = new FormData()
        formData.append('Id', Id);
        formData.append('Name', Name)
        formData.append('Price', Price)
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': '*/*'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    window.alert('UPDATE SUCCESSFUL')
                    setIdOrigin('')
                    setNameOrigin('')
                    setPriceOrigin('')
                } else {
                    window.alert('FAIL')
                    setIdOrigin('')
                    setNameOrigin('')
                    setPriceOrigin('')
                }
            })
            .catch((error) => console.error('Error:', error))
    }
    return (
        <div>
            <button className='CRUDButton btn btn-warning btn-lg' onClick={handleClick}>{context}</button>
            {showUpdateOrigin &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>UPDATE ORIGIN</h3>
                    <form onSubmit={handleSubmit} className='row'>
                        <div className='col-4'>
                            <input type="text" value={idOrigin} onChange={e => setIdOrigin(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='col-4'>
                            <input type="text" value={nameOrigin} onChange={e => setNameOrigin(e.target.value)} className='form-control' placeholder='Origin' />
                        </div>
                        <div className='col-4'>
                            <input type="text" value={priceOrigin} onChange={e => setPriceOrigin(e.target.value)} className='form-control' placeholder='Price' />
                        </div>
                        <div className='formSubmit'>
                            <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                            <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
