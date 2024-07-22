import React from 'react'
function Service1() {
  return (
    <div className="container" style={{
      padding: '20px',
    }}>
      <h1 style={{textAlign: 'center'}}>Ring Size Guide</h1>
        <section>
          <ol>
            <li>Choose a ring with a similar width and design to the one you intend to buy.</li>
            <li>Use a ruler to measure the inside diameter of the ring.</li>
            <li>Compare with the Ring Size Reference Chart.</li>
            <li>Adjust the ring size before placing an online order.</li>
          </ol>
        </section>

        <section>
        <img src="https://file.hstatic.net/1000381168/file/cach-do-ni-size_c01f786c8b7f4f44ae64dedf1d4e5d3a.png" alt="Ring Size Chart" style={{
          maxWidth: '100%', // Make sure the image is responsive
          height: '300px',
          margin: '20px',
        }} />
        </section>

        <section>
          <h2>Note:</h2>
          <ul>
            <li>Customers should not use string or paper to measure ring size as the results may be inaccurate.</li>
            <li>For rings with a thick band design, customers should add 0.15mm-0.6mm to ensure the ring fits comfortably.</li>
            <li>If unsure between two ring sizes, customers should choose the larger size.</li>
            <li>The ring size reference chart below is for reference only. Customers are advised to visit the DIAMOND STORE system for the most accurate ring size measurement.</li>
            <li>Customers are required to pay additional fees for making new molds, processing, and crafting when the ring size exceeds the STANDARD SIZE (Female size 15 and above, Male size 20.5 and above).</li>
          </ul>
       </section>

       <section>
          <h2>Ring Size Reference Chart</h2>
          <img src="https://th.bing.com/th/id/R.02f6b623400e16a3f360dce55eb21fbb?rik=PcFMykFYtpW%2btQ&riu=http%3a%2f%2ffile.hstatic.net%2f1000112565%2ffile%2fbang-size-nhan-chuan.jpg&ehk=TxLgJie37cBJhKMMJVTLuIR3WGpjSThfk%2fedRtRVfcs%3d&risl=&pid=ImgRaw&r=0" alt="Ring Size Chart" style={{
            maxWidth: '100%', // Make sure the image is responsive
            height: 'auto',
            margin: '20px 0', // Add some margin for spacing
          }} />
       </section>
    </div>
  )
}

export default Service1