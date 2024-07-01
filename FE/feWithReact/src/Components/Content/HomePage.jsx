import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Banner2 from './Banner/Banner2'; import SummerCollection from './Category/SummerCollection';
'./Banner/Banner2';
import AboutUs from './Banner/AboutUs';
export default function HomePage() {

  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
    }}>
      <Banner></Banner>
      <Category></Category>
      <Banner2></Banner2>
      <SummerCollection></SummerCollection>
      <AboutUs></AboutUs>
    </div>
  );
};