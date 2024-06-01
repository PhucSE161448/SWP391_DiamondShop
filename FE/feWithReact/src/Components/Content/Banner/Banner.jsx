import React from 'react';
import './Banner.css';
import { swiffyslider } from 'swiffy-slider';
import "swiffy-slider/css"
import { useEffect } from 'react';
export default function Banner() {
    window.swiffyslider = swiffyslider;

    useEffect(() => {
        window.swiffyslider.init();
    }, []);
    return (
        <div className='swiffy-slider slider-nav-animation slider-nav-animation-fadein slider-nav-autoplay'
            id='swiffy-animation'>
            <ul className='slider-container bannerContainer'>
                <li><img src='src/assets/img/img2.jpg' className='imgBanner' /></li>
                <li><img src='src/assets/img/img3.jpg' className='imgBanner' /></li>
                <li><img src='src/assets/img/img4.png' className='imgBanner' /></li>
            </ul>

            <button type='button' className='slider-nav' aria-label='Go left'></button>
            <button type='button' className='slider-nav slider-nav-next' aria-label='Go left'></button>
        </div>
    );
};