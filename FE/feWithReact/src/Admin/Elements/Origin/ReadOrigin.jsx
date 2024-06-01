import React, { useState, useEffect } from 'react';

export default function ReadOrigin() {
    const [showReadOrigin, setShowReadOrigin] = useState(false)
    const [context, setContext] = useState('SHOW ALL')

    const handleClick = () => {
        setShowReadOrigin(!showReadOrigin)
        setContext(prevContext => prevContext === 'SHOW ALL' ? 'Click here to close SHOW ALL' : 'SHOW ALL')
    }
    function Read() {
        const [data, setData] = useState(null);


        useEffect(() => {
            const url = 'https://localhost:7122/api/Origin/GetList'
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => response.json())
                .then(responseData => {
                    setData(responseData.data); // Access the array using the key
                })
                .catch((error) => console.error('Error:', error))
        }, []);

        return (
            <div>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <>
            <button onClick={handleClick} className='CRUDButton btn btn-primary btn-lg'>{context}</button>
            {showReadOrigin &&
                <div className='formCRUDContainer'>
                    <h3>SHOW ALL</h3>
                    <Read></Read>
                    <button onClick={handleClick} className='btn btn-danger btn-lg submitButton'>CLOSE</button>
                </div>
            }
        </>
    )
}
