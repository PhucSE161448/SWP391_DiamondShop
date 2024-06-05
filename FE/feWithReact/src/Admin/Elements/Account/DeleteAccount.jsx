import React, { useState } from 'react'

export default function DelelteAccount() {
    const [idAccount, setIdAccount] = useState('')
    const [showByIdAccount, setShowByIdAccount] = useState(false)
    const [context, setContext] = useState('DELETE')

    const handleClick = () => {
        setShowByIdAccount(!showByIdAccount)
        setContext(prevContext => prevContext === 'DELETE' ? 'Click again to close DELETE' : 'DELETE')
    }

    const handleClear = () => {
        setIdAccount('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (idAccount) {
            const url = 'https://localhost:7122/api/Account/DeleteUser/' + idAccount
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(() => {
                    window.alert('DELETE SUCCESSFUL')

                })
                .catch(error => {
                    console.error('Error:', error)
                    window.alert('FAIL')
                })
        }
    }



    return (
        <>
            <button className='CRUDButton btn btn-danger btn-lg' onClick={handleClick}>{context}</button>
            {showByIdAccount &&
                <div className='formCRUDContainer'>
                    <h3 className='titleOfForm'>DELETE Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" value={idAccount} onChange={e => setIdAccount(e.target.value)} className='form-control' placeholder='Id' />
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
