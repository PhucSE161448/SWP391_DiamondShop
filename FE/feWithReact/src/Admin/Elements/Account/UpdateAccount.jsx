import React, { useState } from 'react'

export default function UpdateAccount() {
    const [nameAccount, setnameAccount] = useState('')
    const [emailAccount, setEmailAccount] = useState('')
    const [genderAccount, setGenderAccount] = useState(true)
    const [passwordAccount, setPasswordAccount] = useState('')
    const [phoneAccount, setPhoneAccount] = useState('')
    const [roleAccount, setRoleAccount] = useState(1)
    const [showUpdateCW, setShowUpdateCW] = useState(false)
    const [context, setContext] = useState('UPDATE')

    const handleClick = () => {
        setShowUpdateCW(!showUpdateCW)
        setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close UPDATE' : 'UPDATE')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
        CreateAccount(emailAccount, passwordAccount, nameAccount, genderAccount, passwordAccount, roleAccount)
    }

    const handleClear = () => {
        setIdAccount('')
        setnameAccount('')
        setColorAccount('')
        setpriceAccount('')
    }

    function UpdateCaratWeight(Id, Name, Color, Price) {
        const url = 'https://localhost:7122/api/Account/UpdateUser/' + Id
        const data = {
            name: Name,
            email: Email,
            gender: Gender,
            password: Password,
            phone: Phone,
            role: Role
        }
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': '*/*'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    window.alert('UPDATE SUCCESSFUL')
                    setIdAccount('')
                    setnameAccount('')
                    setColorAccount('')
                    setpriceAccount('')
                } else {
                    window.alert('FAIL')
                    setIdAccount('')
                    setnameAccount('')
                    setColorAccount('')
                    setpriceAccount('')
                }
            })
            .catch((error) => console.error('Error:', error));
    }
    return (
        <>
            <button className='CRUDButton btn btn-warning btn-lg' onClick={handleClick}>{context}</button>
            {showUpdateCW &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>UPDATE Account</h3>
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
            }
        </>
    )
}
