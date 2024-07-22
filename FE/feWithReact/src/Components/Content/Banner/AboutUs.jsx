import React from 'react'
import './Banner.css'
export default function AboutUs() {
	return (
		<div className='container-fluid bannerContainer'>
			<div className='row'>
				<div className='col-6 contentBannerContainerAboutUs'>
					<h1 id='aboutUs'>
						___ABOUT US___
					</h1>

					<div id='storeName'>
						DIAMOND STORE
					</div>
					<div>
						Diamond & Jewelry
					</div>
					<div>
						With their radiant beauty and unmatched elegance, diamonds and precious stones have always been the choice of the elite and the epitome of luxury.
					</div>
					<div>
						Our customers can be completely assured of the quality, value, and price of each diamond when purchasing from Diamond Official Store. Integrity and responsibility in business are our foremost principles!
					</div>
					<div>
						Let DIAMOND STORE elevate your life!
					</div>
				</div>
				<div className='col-6 contentBannerContainerAboutUs'>
					<img src="https://www.thearmchairtrader.com/wp-content/uploads/2022/09/diamond-mining-gems.jpg" alt="" className='imgBanner2' />
				</div>
			</div>

		</div>
	)
}
