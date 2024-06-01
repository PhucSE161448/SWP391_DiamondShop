import React, { useState } from 'react';

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
    const handleClear = () => {
        setWeightCW('')
        setPriceCW('')
    }
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
                    setWeightCW('')
                    setPriceCW('')
                } else {
                    window.alert('FAIL')
                    setWeightCW('')
                    setPriceCW('')
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <div>
            <button onClick={handleClick} className='CRUDButton btn btn-success btn-lg'>{context}</button>
            {showCreateCW &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>CREATE CARAT WEIGHT</h3>
                    <div>
                        <form onSubmit={handleSubmit} className='row'>
                            <div className='col-6'>
                                <input type="text" value={weightCW} onChange={e => setWeightCW(e.target.value)} className='form-control' placeholder='Weight' />
                            </div>
                            <div className='col-6'>
                                <input type="text" value={priceCW} onChange={e => setPriceCW(e.target.value)} className='form-control' placeholder='Price' />
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