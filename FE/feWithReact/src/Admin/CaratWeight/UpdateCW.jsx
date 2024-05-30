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
        <>
            <button className='CRUDButton' onClick={handleClick}>{context}</button>
            {showUpdateCW &&
                <div className='formCRUDContainer'>
                    <h3>UPDATE</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={idCW} onChange={e => setIdCW(e.target.value)} />
                        </label>
                        <label>
                            Weight:
                            <input type="text" value={weightCW} onChange={e => setWeightCW(e.target.value)} />
                        </label>
                        <label>
                            Price:
                            <input type="text" value={priceCW} onChange={e => setPriceCW(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            }
        </>
    )
}
