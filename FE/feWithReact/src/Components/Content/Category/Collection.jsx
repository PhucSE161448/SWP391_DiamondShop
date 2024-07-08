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
      const url = createApi('Product/GetPagedProducts?CategoryIds=1')
      await fetch(url)
        .then(response => response.json())
        .then(responseData => setData(responseData.items))
    }
    getCollection()
  }, [])

  const handleNavigateCollection = (id) => {
    navigate(`/product/detail/${id}`)
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        fontSize: '2rem',
        color: 'black',
        marginTop: '10px'

      }}>
        <h1>COLLECTION</h1>
      </div>
      <div className='swiffy-slider slider-item-show4 slider-nav-page slider-nav-autoplay slider-nav-autopause slider-nav-dark slider-item-show2-sm'>
        <ul className='slider-container '>
          {data.map((data) => (
            data.isDeleted ? null :
              (
                <li key={data.id}>
                  <div onClick={() => handleNavigateCollection(data.id)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Card sx={{
                      width: '15vw',
                      margin: '10px',
                      borderRadius: '20px',
                    }}>
                      <CardMedia>
                        <img src={data.images[0].urlPath} style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '20px 20px 0 0',
                        }} />
                      </CardMedia>
                      <CardContent>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',

                        }}>
                          <h3>{data.name}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </li>
              )

          ))}
        </ul>

        <button type='button' className='slider-nav' aria-label='Go left'></button>
        <button type='button' className='slider-nav slider-nav-next' aria-label='Go left'></button>
      </div>
    </div>
  )
}
