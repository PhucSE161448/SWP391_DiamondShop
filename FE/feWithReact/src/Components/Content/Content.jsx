import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Banner2 from './Banner/Banner2'; import SummerCollection from './Category/SummerCollection';
'./Banner/Banner2';
import AboutUs from './Banner/AboutUs';
export default function Content() {

    return (
        <>
            <Banner></Banner>
            <Category></Category>
            <Banner2></Banner2>
            <SummerCollection></SummerCollection>
            <AboutUs></AboutUs>
        </>
    );
};