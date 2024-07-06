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
        <li><img src='https://www.diamondsfactory.com.au/image/catalog/blog/2016/blogaprildiamond1920.jpg' className='imgBanner' /></li>
        <li><img src='https://wallpaperswide.com/download/diamonds_2-wallpaper-1920x600.jpg' className='imgBanner' /></li>
        <li><img src='https://cdn.shopify.com/s/files/1/0565/7955/5494/files/HCDAC-banners.png' className='imgBanner' /></li>
      </ul>

      <button type='button' className='slider-nav' aria-label='Go left'></button>
      <button type='button' className='slider-nav slider-nav-next' aria-label='Go left'></button>
    </div>
  );
};