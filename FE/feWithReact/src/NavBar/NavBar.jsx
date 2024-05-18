import React from 'react';
import './navBar.css';
export default function NavBar() {
    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary '>
            <div className='container-fluid' id='navBarContainer'>
                <div>
                    <a href='index.html'>Home</a>
                </div>
                <div>
                    <a href='index.html'>Diamond</a>
                </div>
                <div>
                    <a>Engagement Rings</a>
                </div>
                <div>
                    <a>Wedding Rings</a>
                </div>
                <div>
                    <a>Jewelry</a>
                </div>
                <div>
                    <a>Gifts</a>
                </div>
                <div>
                    <a>Gemstones</a>
                </div>
                <div>
                    <a href=''><img src="src\assets\img\shopping-cart (1).png" alt="" className='cartLogo' /></a>
                </div>
            </div>
        </nav>
    );
};