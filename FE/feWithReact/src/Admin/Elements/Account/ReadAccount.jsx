import React, { useState, useEffect } from 'react';

export default function ReadAccount() {
    const [showReadCW, setShowReadCW] = useState(false)
    const [context, setContext] = useState('SHOW ALL')

    const handleClick = () => {
        setShowReadCW(!showReadCW)
        setContext(prevContext => prevContext === 'SHOW ALL' ? 'Click again to close SHOW ALL' : 'SHOW ALL')
    }

    function getRoleName(roleId) {
        switch (roleId) {
            case 1:
                return 'Admin'
            case 2:
                return 'Sale staff'
            case 3:
                return 'Delivery staff'
            case 4:
                return 'Customer'
        }
    }

    function Read() {
        const [data, setData] = useState(null);


        useEffect(() => {
            const url = 'https://localhost:7122/api/Account/GetAccountList';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => response.json())
                .then(responseData => {
                    setData(responseData); // Access the array using the key
                })
                .catch((error) => console.error('Error:', error))
        }, []);

        return (
            <div>
                {
                    data && data.StatusCode === 404 ? (<h3>Account not found</h3>) : (
                        <table className='table table-striped table-bordered '>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Phone number</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data && data.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.gender ? 'Male' : 'Female'}</td>
                                        <td>{data.phoneNumber}</td>
                                        <td>{getRoleName(data.roleId)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>)
                }
            </div>
        );
    }

    return (
        <>
            <button onClick={handleClick} className='CRUDButton btn btn-primary btn-lg'>{context}</button>
            {showReadCW &&
                <div className='formCRUDContainer'>
                    <h3>SHOW ALL</h3>
                    <Read></Read>
                    <button onClick={handleClick} className='btn btn-danger btn-lg submitButton'>CLOSE</button>
                </div>
            }
        </>
    )
}
