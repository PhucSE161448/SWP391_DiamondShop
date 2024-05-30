import React, { useState } from 'react';
import '../Admin.css'
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
    };

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
        <>
            <button onClick={handleClick} className='CRUDButton'>{context}</button>
            {showCreateCut &&
                <div className='formCRUDContainer'>
                    <h3>CREATE</h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={nameCut} onChange={e => setNameCut(e.target.value)} />
                            </label>
                            <label>
                                Price:
                                <input type="text" value={priceCut} onChange={e => setPriceCut(e.target.value)} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            }
        </>
    );
}