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

    const handleClear = () => {
        setIdCut('')
        setNameCut('')
        setPriceCut('')
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
            <button className='CRUDButton btn btn-warning btn-lg' onClick={handleClick}>{context}</button>
            {showUpdateCut &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>UPDATE CUT</h3>
                    <form onSubmit={handleSubmit} className='row'>
                        <div className='col-4'>
                            <input type="text" value={idCut} onChange={e => setIdCut(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='col-4'>
                            <input type="text" value={nameCut} onChange={e => setNameCut(e.target.value)} className='form-control' placeholder='Cut' />
                        </div>
                        <div className='col-4'>
                            <input type="text" value={priceCut} onChange={e => setPriceCut(e.target.value)} className='form-control' placeholder='Price' />
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
