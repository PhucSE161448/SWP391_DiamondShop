import React, { useState } from 'react';

export default function CreateAccount() {
    const [nameAccount, setnameAccount] = useState('')
    const [emailAccount, setEmailAccount] = useState('')
    const [genderAccount, setGenderAccount] = useState(true)
    const [passwordAccount, setPasswordAccount] = useState('')
    const [phoneAccount, setPhoneAccount] = useState('')
    const [roleAccount, setRoleAccount] = useState(1)
    const [showCreateAccount, setShowCreateAccount] = useState(false)
    const [context, setContext] = useState('CREATE')

    const handleClick = () => {
        setShowCreateAccount(!showCreateAccount)
        setContext(prevContext => prevContext === 'CREATE' ? 'Click again to close CREATE' : 'CREATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
        CreateAccount(emailAccount, passwordAccount, nameAccount, genderAccount, passwordAccount, roleAccount)
    }

    const handleClear = () => {
        setnameAccount('')
        setEmailAccount('')
    }

    function CreateAccount(Email, Password, Name, Gender, Phone, Role) {
        const url = 'https://localhost:7122/api/Account/CreateUser'
        const data = {
            name: Name,
            email: Email,
            gender: Gender,
            password: Password,
            phone: Phone,
            role: Role
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    window.alert('CREATE SUCCESSFUL')
                } else {
                    window.alert('FAIL')
                }
            })
            .catch((error) => console.error('Error:', error))
    }

    return (
        <>
            <button onClick={handleClick} className='CRUDButton btn btn-success btn-lg'>{context}</button>
            {showCreateAccount &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>CREATE Account</h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>

                                <div className='col-6'>
                                    <input type="text" value={emailAccount} onChange={e => setEmailAccount(e.target.value)} placeholder='Email' className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <input type="password" value={passwordAccount} onChange={e => setPasswordAccount(e.target.value)} placeholder='Password' className='form-control' />
                                </div>
                            </div><br />
                            <div className='row'>
                                <div className='col-4'>
                                    <input type="text" value={nameAccount} onChange={e => setnameAccount(e.target.value)} placeholder='Name' className='form-control' />
                                </div>
                                <div className='col-4'>
                                    <select value={genderAccount} onChange={e => setGenderAccount(e.target.value === "true")} className='form-control'>
                                        <option value={true}>Male</option>
                                        <option value={false}>Female</option>
                                    </select>
                                </div>
                                <div className='col-4'>
                                    <input type="text" value={phoneAccount} onChange={e => setPhoneAccount(e.target.value)} placeholder='Phone' className='form-control' />
                                </div>
                            </div> <br />
                            <div>
                                <div>
                                    <select value={roleAccount.toString()} onChange={e => setRoleAccount(parseInt(e.target.value, 10))} className='form-control'>
                                        <option value="1">Admin</option>
                                        <option value="2">Sale staff</option>
                                        <option value="3">Delivery staff</option>
                                        <option value="4">Customer</option>
                                    </select>
                                </div>
                            </div>

                            <div className='formSubmit' >
                                <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
                                <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}