import React, { useState } from 'react'

export default function UpdateCut() {
    const [idCut, setIdCut] = useState('')
    const [nameCut, setNameCut] = useState('')
    const [priceCut, setPriceCut] = useState('')
    const [showUpdateCut, setShowUpdateCut] = useState(false)
    const [context, setContext] = useState('UPDATE')

    const handleClick = () => {
        setShowUpdateCut(!showUpdateCut)
        setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close' : 'UPDATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        UpdateCut(idCut, nameCut, priceCut)
    }

    function UpdateCut(Id, Name, Price) {
        const url = 'https://localhost:7122/api/Cut/Update/' + idCut;
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
                    setIdCut('')
                    setNameCut('')
                    setPriceCut('')
                } else {
                    window.alert('FAIL')
                    setIdCut('')
                    setNameCut('')
                    setPriceCut('')
                }
            })
            .catch((error) => console.error('Error:', error))
    }
    return (
        <>
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showUpdateCut &&
                <div className='formCRUDContainer'>
                    <h3>UPDATE</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idCut} onChange={e => setIdCut(e.target.value)} />
                        </label>
                        <label>
                            Cut:
                            <input type="text" value={nameCut} onChange={e => setNameCut(e.target.value)} />
                        </label>
                        <label>
                            Price:
                            <input type="text" value={priceCut} onChange={e => setPriceCut(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            }
        </>
    )
}
