import React, { useState } from 'react';
export default function CreateOrigin() {
    const [nameOrigin, setNameOrigin] = useState('')
    const [priceOrigin, setPriceOrigin] = useState('')
    const [showCreateOrigin, setShowCreateOrigin] = useState(false)
    const [context, setContext] = useState('CREATE')

    const handleClick = () => {
        setShowCreateOrigin(!showCreateOrigin)
        setContext(prevContext => prevContext === 'CREATE' ? 'Click here to close CREATE' : 'CREATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateOrigin, truyền weight và price như là các đối số
        CreateOrigin(nameOrigin, priceOrigin)
    }

    const handleClear = () => {
        setNameOrigin('')
        setPriceOrigin('')
    }

    function CreateOrigin(Name, Price) {
        const url = 'https://localhost:7122/api/Origin/Create'
        const formData = new FormData();
        // Add your data to formData here
        // For example: formData.append('name', 'value');
        formData.append('Name', Name);
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
                    setNameOrigin('')
                    setPriceOrigin('')
                } else {
                    window.alert('FAIL')
                    setNameOrigin('')
                    setPriceOrigin('')
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <div>
            <button onClick={handleClick} className='CRUDButton btn btn-success btn-lg'>{context}</button>
            {showCreateOrigin &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>CREATE ORIGIN</h3>
                    <div>
                        <form onSubmit={handleSubmit} className='row'>
                            <div className='col-6'>
                                <input type="text" value={nameOrigin} onChange={e => setNameOrigin(e.target.value)} className='form-control' placeholder='Name' />
                            </div>
                            <div className='col-6'>
                                <input type="text" value={priceOrigin} onChange={e => setPriceOrigin(e.target.value)} className='form-control' placeholder='Price' />
                            </div>
                            <div className='formSubmit' >
                                <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                                <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}