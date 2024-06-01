import React from 'react'
import { swiffyslider } from 'swiffy-slider';
import "swiffy-slider/css"
import './Category.css'
import { SummerCollectionData } from './listOfSummerCollection'
export default function SummerCollection() {
    window.swiffyslider = swiffyslider;

    window.addEventListener("load", () => {
        window.swiffyslider.init();
    });
    return (
        <div className='container-fluid categoryContainer'>
            <div>
                <h1 className='categoryTitle'>SUMMER COLLECTION</h1>
            </div>
            <div className='swiffy-slider slider-item-show4 slider-nav-page slider-nav-autoplay slider-nav-autopause slider-nav-dark slider-item-show2-sm' id='centered'>
                <ul className='slider-container productContainer ' id='productContainerId'>
                    {SummerCollectionData.map((SummerCollectionData) => (
                        <li key={SummerCollectionData.id}>
                            <a href=''>
                                <div className='card border-0'>
                                    <div className='ratio ratio-1x1'>
                                        <img src={SummerCollectionData.img} alt='' className='imgListProduct' />
                                    </div>
                                    <div className='card-body p-0 pt-2'>
                                        <div className='d-flex' id='textContainer'>
                                            <h3 className='flex-grow-1'>{SummerCollectionData.name}</h3>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>

                <button type='button' className='slider-nav' aria-label='Go left'></button>
                <button type='button' className='slider-nav slider-nav-next' aria-label='Go left'></button>
            </div>
        </div>
    )
}
