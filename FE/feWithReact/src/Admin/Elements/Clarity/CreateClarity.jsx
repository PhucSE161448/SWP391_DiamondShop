import React, { useState } from 'react';

export default function CreateClarity() {
    const [nameClarity, setnameClarity] = useState('')
    const [colorClarity, setColorClarity] = useState('')
    const [priceClarity, setpriceClarity] = useState('')
    const [showCreateCW, setShowCreateCW] = useState(false)
    const [context, setContext] = useState('CREATE')

    const handleClick = () => {
        setShowCreateCW(!showCreateCW)
        setContext(prevContext => prevContext === 'CREATE' ? 'Click again to close CREATE' : 'CREATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
        CreateClarity(nameClarity, colorClarity, priceClarity)
    }

    const handleClear = () => {
        setnameClarity('')
        setColorClarity('')
        setpriceClarity('')
    }

    function CreateClarity(Name, Color, Price) {
        const url = 'https://localhost:7122/api/Clarity/Create';
        const formData = new FormData();

        formData.append('Name', Name);
        formData.append('Color', Color)
        formData.append('Price', Price);
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    window.alert('CREATE SUCCESSFUL')
                    setnameClarity('')
                    setColorClarity('')
                    setpriceClarity('')
                } else {
                    window.alert('FAIL')
                    setnameClarity('')
                    setColorClarity('')
                    setpriceClarity('')
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <>
            <button onClick={handleClick} className='CRUDButton btn btn-success btn-lg'>{context}</button>
            {showCreateCW &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>CREATE CLARITY</h3>
                    <div>
                        <form onSubmit={handleSubmit} className='row'>
                            <div className='col-4'>
                                <input type="text" value={nameClarity} onChange={e => setnameClarity(e.target.value)} placeholder='Name' className='form-control' />
                            </div>
                            <div className='col-4'>
                                <input type="text" value={colorClarity} onChange={e => setColorClarity(e.target.value)} placeholder='Color' className='form-control' />
                            </div>
                            <div className='col-4'>
                                <input type="text" value={priceClarity} onChange={e => setpriceClarity(e.target.value)} placeholder='Price' className='form-control' />
                            </div>
                            <div className='formSubmit' >
                                <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                                <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}