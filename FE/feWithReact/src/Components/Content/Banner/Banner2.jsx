import React from 'react'
import './Banner.css';
export default function Banner2() {
    return (
        <div className='container-fluid bannerContainer'>
            <div className='row'>
                <a href='' className='col-6 contentBannerContainer'>
                    <img src='src/assets/img/productsBanner2.jpg' className='imgBanner2' />
                    <h1>Best Ring</h1>
                </a>
                <a href='' className='col-6 contentBannerContainer'>
                    <img src='src/assets/img/productsBanner2_2.jpg' alt="" className='imgBanner2' />
                    <h1>Best necklaces</h1>
                </a>
            </div>

        </div>
    )
}