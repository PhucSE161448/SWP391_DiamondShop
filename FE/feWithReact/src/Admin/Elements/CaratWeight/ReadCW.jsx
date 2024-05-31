import React, { useState, useEffect } from 'react';

export default function ReadCW() {
    const [showReadCW, setShowReadCW] = useState(false)
    const [context, setContext] = useState('SHOW ALL')

    const handleClick = () => {
        setShowReadCW(!showReadCW)
        setContext(prevContext => prevContext === 'SHOW ALL' ? 'Click here to close SHOW ALL' : 'SHOW ALL')
    }
    function Read() {
        const [data, setData] = useState(null);


        useEffect(() => {
            const url = 'https://localhost:7122/api/CaratWeight/GetList'
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
                <table className='table table-striped c '>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Weight</th>
                            <th>Price</th>
                        </tr>
                        {data !== null ? (
                            data.map((data) => (
                                <tr key={data.id}>
                                    <td> {data.id}</td>
                                    <td> {data.weight}</td>
                                    <td> {data.price}</td>
                                </tr>
                            ))
                        ) : (
                            <h3>
                                Data not found
                            </h3>
                        )}
                    </tbody>
                </table>


            </div>
        );
    }

    return (
        <div>
            <button onClick={handleClick} className='CRUDButton btn btn-primary btn-lg'>{context}</button>
            {showReadCW &&
                <div className='formCRUDContainer'>
                    <h3>SHOW ALL</h3>
                    <Read></Read>
                    <button onClick={handleClick} className='btn btn-danger btn-lg submitButton'>CLOSE</button>
                </div>
            }
        </div>
    )
}
