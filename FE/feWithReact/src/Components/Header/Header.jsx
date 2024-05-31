import React from 'react';
import './Header.css';
function Header() {
    return (
        <div className='container-fluid'>
            <div className='containerHeader'>
                <div>
                    <img src="src/assets/img/diamondLogo.png" alt="" id='logoHeader' />
                </div>
                <div>
                    <h1 className='shopName'>DIAMOND OFFCIAL STORE</h1>
                </div>
                <div className='searchContainer'>
                    <form action="">
                        <input type="text" placeholder="Search for items..." id='searchHeader' className='form' />
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Header;