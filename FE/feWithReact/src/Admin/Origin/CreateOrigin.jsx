import React, { useState } from 'react';
import '../Admin.css'
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
    };

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
        <>
            <button onClick={handleClick} className='CRUDButton'>{context}</button>
            {showCreateOrigin &&
                <div className='formCRUDContainer'>
                    <h3>CREATE</h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={nameOrigin} onChange={e => setNameOrigin(e.target.value)} />
                            </label>
                            <label>
                                Price:
                                <input type="text" value={priceOrigin} onChange={e => setPriceOrigin(e.target.value)} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            }
        </>
    );
}