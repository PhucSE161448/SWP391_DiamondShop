import React from 'react'

function Service2() {
  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}>
      <div className="container" style={{
        padding: '20px',
      }}>
        <h1 style={{ textAlign: 'center' }}>CARE INSTRUCTIONS:</h1>
        <p style={{ textAlign: 'center' }}>Jewelry and Diamonds are valuable Assets, Customers should handle and use them with care and gently.</p>

        <h2>1. Jewelry Care</h2>
        <section>
          <img src="https://cdn.shopify.com/s/files/1/0269/4103/0509/files/Jewellery-Care.jpg?v=1572983629" alt="Ring Size Chart" style={{
            maxWidth: '100%', // Make sure the image is responsive
            height: 'auto',
            margin: '20px',
          }} />
        </section>

        <h2>2. Diamond Care</h2>
        <section>
          <p>Although diamonds are the hardest gemstones, they can still be scratched, chipped, or cracked due to strong impacts or collisions during use. Such damage can reduce the quality and value of the diamond.</p>
          <p>If a diamond develops scratches, cracks, or chips during use, it will be examined and evaluated by the DOJI Institute of Gemology and Jewelry (DOJILAB). The results of this evaluation will determine the quality and valuation for potential exchange.</p>
          <p>The certification paper should be carefully preserved as it is crucial for verifying the origin and quality of the diamond you own.</p>
          <p>If the certification paper is lost, wrinkled, stained, or information is obscured, you will need to pay a fee to have the diamond re-evaluated and receive a new certification paper.</p>
        </section>
        <section>
          <img src="https://4.bp.blogspot.com/-r-wbMYM7qfw/Wt9bFKb4FUI/AAAAAAAAAWI/hO4iw6Dwghgxc2MNvZFkFE5qYbJcWN3ywCLcBGAs/s1600/gia-kim-cuong-GIA-7%2Bly27-nuoc%2BD-3%2BExcellent-Medium%2Bblue.jpg" alt="Ring Size Chart" style={{
            maxWidth: '100%', // Make sure the image is responsive
            height: 'auto',
            margin: '20px',
          }} />
        </section>
      </div>
    </div>


  )
}

export default Service2