import React, { useState } from 'react'

export default function UpdateCW() {
    const [idCW, setIdCW] = useState('')
    const [weightCW, setWeightCW] = useState('')
    const [priceCW, setPriceCW] = useState('')
    const [showUpdateCW, setShowUpdateCW] = useState(false)
    const [context, setContext] = useState('UPDATE')

    const handleClick = () => {
        setShowUpdateCW(!showUpdateCW)
        setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close' : 'UPDATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
        UpdateCaratWeight(idCW, weightCW, priceCW)
    }
    const handleClear = () => {
        setIdCW('')
        setWeightCW('')
        setPriceCW('')
        setDataCW('')
    }
    function UpdateCaratWeight(Id, Weight, Price) {
        const url = 'https://localhost:7122/api/CaratWeight/Update/' + idCW;
        const formData = new FormData()
        formData.append('Id', Id);
        formData.append('Weight', Weight)
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
                    setWeightCW('')
                    setPriceCW('')
                } else {
                    window.alert('FAIL')
                    setWeightCW('')
                    setPriceCW('')
                }
            })
            .catch((error) => console.error('Error:', error))
    }
    return (
        <div>
            <button className='CRUDButton btn btn-warning btn-lg' onClick={handleClick}>{context}</button>
            {showUpdateCW &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>UPDATE CARAT WEIGHT</h3>
                    <form onSubmit={handleSubmit} className='row'>
                        <div className='col-4'>
                            <input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} className='form-control' placeholder='Id' />
                        </div>
                        <div className='col-4'>
                            <input type="text" value={weightCW} onChange={e => setWeightCW(e.target.value)} className='form-control' placeholder='Weight' />
                        </div>
                        <div className='col-4'>
                            <input type="text" value={priceCW} onChange={e => setPriceCW(e.target.value)} className='form-control' placeholder='Price' />
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
