import React, { useState, useEffect } from 'react';

export default function ReadClarity() {
    const [showReadCW, setShowReadCW] = useState(false)
    const [context, setContext] = useState('SHOW ALL')

    const handleClick = () => {
        setShowReadCW(!showReadCW)
        setContext(prevContext => prevContext === 'SHOW ALL' ? 'Click again to close SHOW ALL' : 'SHOW ALL')
    }
    function Read() {
        const [data, setData] = useState(null);


        useEffect(() => {
            const url = 'https://localhost:7122/api/Clarity/GetList';
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
                .catch((error) => console.error('Error:', error));
        }, []);

        return (
            <div>

                <table>
                    <tbody>
                        {data && data.map((data) => (
                            <tr key={data.id}>
                                <td>Name: {data.name}</td>
                                <td>Color: {data.color}</td>
                                <td>Price: {data.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        );
    }

    return (
        <>
            <button onClick={handleClick} className='CRUDButton'>{context}</button>
            {showReadCW &&
                <div className='formCRUDContainer'>
                    <h3>READ ALL</h3>
                    <Read></Read>
                </div>
            }
        </>
    )
}
