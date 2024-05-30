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
        <>
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showUpdateOrigin &&
                <div className='formCRUDContainer'>
                    <h3>UPDATE</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idOrigin} onChange={e => setIdOrigin(e.target.value)} />
                        </label>
                        <label>
                            Origin:
                            <input type="text" value={nameOrigin} onChange={e => setNameOrigin(e.target.value)} />
                        </label>
                        <label>
                            Price:
                            <input type="text" value={priceOrigin} onChange={e => setPriceOrigin(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            }
        </>
    )
}
