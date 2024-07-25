import React from 'react'
function Service1() {
  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}>
      <div className="container" style={{
        padding: '20px',
      }}>
        <h1 style={{ textAlign: 'center' }}>Ring Size Guide</h1>
        <section>
          <ol>
            <li>Choose a ring with a similar width and design to the one you intend to buy.</li>
            <li>Use a string to measure the diameter of your finger.</li>
            <li>Compare with the Ring Size Reference Chart.</li>
            <li>Adjust the ring size before placing an online order.</li>
          </ol>
        </section>

        <section>
          <img src="https://www.alexmakina.com/Data/EditorFiles/alex/Blog%20G%C3%B6rsel/Ring%20Size%20Measurement%20Using%20Thread%20or%20Floss.jpg" alt="Ring Size Chart" style={{
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
          <img src="https://ar.happyvalentinesday2020.online/pics/printablee.com/postpic/2010/10/printable-ring-size-chart_351544.png" alt="Ring Size Chart" style={{
            maxWidth: '100%', // Make sure the image is responsive
            height: 'auto',
            margin: '20px 0', // Add some margin for spacing
          }} />
        </section>
      </div>
    </div>
  )
}

export default Service1