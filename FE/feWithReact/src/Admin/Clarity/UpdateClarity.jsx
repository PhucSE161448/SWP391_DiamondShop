import React, { useState } from 'react'

export default function UpdateClarity() {
    const [idClarity, setIdClarity] = useState('')
    const [nameClarity, setnameClarity] = useState('')
    const [colorClarity, setColorClarity] = useState('')
    const [priceClarity, setpriceClarity] = useState('')
    const [showUpdateCW, setShowUpdateCW] = useState(false)
    const [context, setContext] = useState('UPDATE')

    const handleClick = () => {
        setShowUpdateCW(!showUpdateCW)
        setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close UPDATE' : 'UPDATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
        UpdateCaratWeight(idClarity, nameClarity, colorClarity, priceClarity)
    }

    function UpdateCaratWeight(Id, Name, Color, Price) {
        const url = 'https://localhost:7122/api/Clarity/Update/' + Id
        const formData = new FormData()
        formData.append('Id', Id)
        formData.append('Name', Name)
        formData.append('Color', colorClarity)
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
                    setIdClarity('')
                    setnameClarity('')
                    setColorClarity('')
                    setpriceClarity('')
                } else {
                    window.alert('FAIL')
                    setIdClarity('')
                    setnameClarity('')
                    setColorClarity('')
                    setpriceClarity('')
                }
            })
            .catch((error) => console.error('Error:', error));
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
                            <input type="text" value={idClarity} onChange={e => setIdClarity(e.target.value)} />
                        </label>
                        <label>
                            Name:
                            <input type="text" value={nameClarity} onChange={e => setnameClarity(e.target.value)} />
                        </label>
                        <label>
                            Color:
                            <input type="text" value={colorClarity} onChange={e => setColorClarity(e.target.value)} />
                        </label>
                        <label>
                            Price:
                            <input type="text" value={priceClarity} onChange={e => setpriceClarity(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            }
        </>
    )
}
