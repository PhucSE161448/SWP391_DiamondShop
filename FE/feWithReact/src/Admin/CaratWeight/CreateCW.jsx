import React, { useState } from 'react';
import '../Admin.css'
export default function CreateCW() {
    const [weightCW, setWeightCW] = useState('')
    const [priceCW, setPriceCW] = useState('')
    const [showCreateCW, setShowCreateCW] = useState(false)
    const [context, setContext] = useState('CREATE')

    const handleClick = () => {
        setShowCreateCW(!showCreateCW)
        setContext(prevContext => prevContext === 'CREATE' ? 'Click here to close CREATE' : 'CREATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
        CreateCaratWeight(weightCW, priceCW)
    };

    function CreateCaratWeight(Weight, Price) {
        const url = 'https://localhost:7122/api/CaratWeight/Create'
        const formData = new FormData();
        // Add your data to formData here
        // For example: formData.append('name', 'value');
        formData.append('Weight', Weight);
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
                    setWeight('')
                    setPrice('')
                } else {
                    window.alert('FAIL')
                    setWeight('')
                    setPrice('')
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <>
            <button onClick={handleClick} className='CRUDButton'>{context}</button>
            {showCreateCW &&
                <div className='formCRUDContainer'>
                    <h3>CREATE</h3>
                    <div>
                        <form onSubmit={handleSubmit}>
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
                </div>
            }
        </>
    );
}