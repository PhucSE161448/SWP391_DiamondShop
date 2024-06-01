import React, { useState } from 'react';

export default function CreateCut() {
    const [nameCut, setNameCut] = useState('')
    const [priceCut, setPriceCut] = useState('')
    const [showCreateCut, setShowCreateCut] = useState(false)
    const [context, setContext] = useState('CREATE')

    const handleClick = () => {
        setShowCreateCut(!showCreateCut)
        setContext(prevContext => prevContext === 'CREATE' ? 'Click here to close CREATE' : 'CREATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateCut, truyền weight và price như là các đối số
        CreateCut(nameCut, priceCut)
    }

    const handleClear = () => {
        setNameCut('')
        setPriceCut('')
    }

    function CreateCut(Name, Price) {
        const url = 'https://localhost:7122/api/Cut/Create'
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
                    setNameCut('')
                    setPriceCut('')
                } else {
                    window.alert('FAIL')
                    setNameCut('')
                    setPriceCut('')
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <div>
            <button onClick={handleClick} className='CRUDButton btn btn-success btn-lg'>{context}</button>
            {showCreateCut &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>CREATE CUT</h3>
                    <div>
                        <form onSubmit={handleSubmit} className='row'>
                            <div className='col-6'>
                                <input type="text" value={nameCut} onChange={e => setNameCut(e.target.value)} placeholder='Name' className='form-control' />
                            </div>
                            <div className='col-6'>
                                <input type="text" value={priceCut} onChange={e => setPriceCut(e.target.value)} placeholder='Price' className='form-control' />
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