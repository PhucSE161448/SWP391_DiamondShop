import React, { useState, useEffect } from 'react';

export default function ReadCut() {
    const [showReadCut, setShowReadCut] = useState(false)
    const [context, setContext] = useState('SHOW ALL')

    const handleClick = () => {
        setShowReadCut(!showReadCut)
        setContext(prevContext => prevContext === 'SHOW ALL' ? 'Click here to close SHOW ALL' : 'SHOW ALL')
    }
    function Read() {
        const [data, setData] = useState(null);


        useEffect(() => {
            const url = 'https://localhost:7122/api/Cut/GetList'
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

                <table>
                    <tbody>
                        {data && data.map((data) => (
                            <tr key={data.id}>
                                <td>Name: {data.name}</td>
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
            {showReadCut &&
                <div className='formCRUDContainer'>
                    <h3>SHOW ALL</h3>
                    <Read></Read>
                </div>
            }
        </>
    )
}
