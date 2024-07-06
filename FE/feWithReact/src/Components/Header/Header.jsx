import React from 'react';
import './Header.css';
function Header() {
	return (
		<div className='container-fluid'>
			<div className='containerHeader'>
				<div>
					<img src="https://cdn-icons-png.flaticon.com/512/14676/14676921.png" alt="" id='logoHeader' />
				</div>
				<div>
					<h1 className='shopName'>DIAMOND STORE</h1>
				</div>

			</div>
		</div>
	);
}

export default Header;