import React, { useEffect, useState } from 'react'
import { swiffyslider } from 'swiffy-slider';
import "swiffy-slider/css"
import { createApi } from '../../../Auth/AuthFunction'
import { Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Collection() {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  window.swiffyslider = swiffyslider;

  window.addEventListener("load", () => {
    window.swiffyslider.init();
  });
  useEffect(() => {
    const getCollection = async () => {
      const url = createApi('Collection/GetAllCollections')
      await fetch(url)
        .then(response => response.json())
        .then(responseData => setData(responseData))
    }
    getCollection()
  }, [])

  const handleNavigateCollection = (id) => {
    navigate(`collection/${id}`)
  }

  return (
    <div className='container-fluid' style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontSize: '2rem',
      color: 'black',
      marginTop: '50px',
      marginBottom: '100px'
    }}>
      <div>
        <h1 className>Collection</h1>
      </div>
      <div className='swiffy-slider slider-item-show4 slider-nav-page slider-nav-autoplay slider-nav-autopause slider-nav-dark slider-item-show2-sm'>
        <ul className='slider-container'>
          {data.filter(item => !item.isDeleted).map((data) => (
            <li key={data.id}>
              <div onClick={() => handleNavigateCollection(data.id)} style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Card sx={{
                  border: '1px solid #000000',
                  borderRadius: '50px',
                  margin: '10px',
                  width: '350px',
                  height: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <h5>{data.name}</h5>
                </Card>
              </div>
            </li>
          ))}
        </ul>

        <button type='button' className='slider-nav' aria-label='Go left'></button>
        <button type='button' className='slider-nav slider-nav-next' aria-label='Go left'></button>
      </div>
    </div>
  )
}
