import React, { useState } from 'react'

export default function UpdateClarity() {
  const [idClarity, setIdClarity] = useState('')
  const [nameClarity, setnameClarity] = useState('')
  const [colorClarity, setColorClarity] = useState('')
  const [priceClarity, setpriceClarity] = useState('')
  const [showUpdateCW, setShowUpdateCW] = useState(false)
  const [context, setContext] = useState('UPDATE')
  const [dataClarity, setDataClarity] = useState(null)
  const handleClick = () => {
    setShowUpdateCW(!showUpdateCW)
    setContext(prevContext => prevContext === 'UPDATE' ? 'Click again to close UPDATE' : 'UPDATE')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
    UpdateClarity(idClarity, nameClarity, colorClarity, priceClarity)
  }

  const handleClear = () => {
    setIdClarity('')
    setnameClarity('')
    setColorClarity('')
    setpriceClarity('')
  }

  function UpdateClarity(Id, Name, Color, Price) {
    const url = 'https://localhost:7122/api/Clarity/Update/' + Id
    const formData = new FormData()
    formData.append('Id', Id)
    formData.append('Name', Name)
    formData.append('Color', Color)
    formData.append('Price', Price)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*'
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseData => {
        setDataClarity(responseData)
      })
  }
  return (
    <>
      <button className='CRUDButton btn btn-warning btn-lg' onClick={handleClick}>{context}</button>
      {showUpdateCW &&
        <div className='formCRUDContainer'>
          <h3 className='titleOfForm'>UPDATE CLARITY</h3>
          <form onSubmit={handleSubmit} className='row'>
            <div className='col-3'>
              <input type="text" value={idClarity} onChange={e => setIdClarity(e.target.value)} className='form-control' placeholder='Id' />
            </div>
            <div className='col-3'>
              <input type="text" value={nameClarity} onChange={e => setnameClarity(e.target.value)} className='form-control' placeholder='Name' />
            </div>
            <div className='col-3'>
              <input type="text" value={colorClarity} onChange={e => setColorClarity(e.target.value)} className='form-control' placeholder='Color' />
            </div>
            <div className='col-3'>
              <input type="text" value={priceClarity} onChange={e => setpriceClarity(e.target.value)} className='form-control' placeholder='Price' />
            </div>
            {
              dataClarity ? (dataClarity.StatusCode === 404 ? (<h3>Clarity doesnt exist</h3>) : (
                dataClarity.status === 400 ? (
                  <h3>
                    {dataClarity.errors.Price}
                  </h3>
                ) : (<h3>Update successful</h3>))
              ) : null
            }
            <div className='formSubmit'>
              <input type="submit" value="Submit" className='btn btn-primary btn-lg submitButton' />
              <input type="button" value="Clear" onClick={handleClear} className='btn btn-danger btn-lg submitButton' />
            </div>
          </form>
        </div>
      }
    </>
  )
}
