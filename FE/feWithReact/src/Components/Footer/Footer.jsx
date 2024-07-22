import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (section) => setHovered(section);
  const handleMouseLeave = () => setHovered(null);

  return (
    <footer style={{
      backgroundColor: '#001529',
      color: '#fff',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderTop: '4px solid #c0954a',
      fontFamily: 'Roboto, sans-serif',
    }}>
      <div>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          textAlign: 'left',
          gap: '20px',
        }}>
          {/* Diamond Policies */}
          <div style={{
            flex: '1',
            margin: '0 20px',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              <li>
                <h1 style={{ fontSize: '1.8em', color: '#c0954a', fontWeight: 'bold', marginBottom: '15px' }}>
                  Terms
                </h1>
              </li>
              {['Diamond Policy', 'Customer Policy', 'Refund Policy', 'Shipping Policy', 'FAQ'].map((text) => (
                <li key={text}>
                  <h5
                    onClick={() => navigate(`/${text.toLowerCase().replace(' ', '')}`)}
                    onMouseEnter={() => handleMouseEnter(text.toLowerCase())}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      cursor: 'pointer',
                      textDecoration: hovered === text.toLowerCase() ? 'underline' : 'none',
                      color: hovered === text.toLowerCase() ? '#c0954a' : '#fff',
                      marginBottom: '10px',
                      fontSize: '1em',
                      transition: 'color 0.3s',
                    }}
                  >
                    {text}
                  </h5>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div style={{
            flex: '1',
            margin: '0 20px',
            minWidth: '250px',
          }}>
            <h1 style={{ fontSize: '1.8em', color: '#c0954a', fontWeight: 'bold', marginBottom: '15px' }}>Contact Us</h1>
            <div style={{ marginBottom: '10px', fontSize: '1em' }}>
              <FaPhoneAlt style={{ marginRight: '10px' }} />
              <span>Phone: 012 3456789 - Fax: 012 3456789</span>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '1em' }}>
              <FaEnvelope style={{ marginRight: '10px' }} />
              <span>Email: support@example.com</span>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '1em' }}>
              <FaMapMarkerAlt style={{ marginRight: '10px' }} />
              <span>Address: Lot E2a-7, Road D1, Long Thanh My, Thu Duc City, Ho Chi Minh City</span>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010498175!2d106.8076943152967!3d10.841127592277624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1680286377326!5m2!1svi!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div style={{ fontSize: '1em' }}>
              <small>© {new Date().getFullYear()} Diamond Shop</small>
            </div>
            <div style={{ marginTop: '10px' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                <FaFacebookF size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                <FaGithub size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* About Us with Image */}
          <div style={{
            flex: '1',
            margin: '0 20px',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h1 style={{ fontSize: '1.8em', marginBottom: '15px', fontWeight: 'bold', color: '#c0954a', borderBottom: '2px solid #c0954a', paddingBottom: '10px' }}>
              About Us
            </h1>
            <div style={{ fontSize: '1.5em', color: '#c0954a', fontWeight: 'bold', marginBottom: '10px' }}>
              DIAMOND STORE
            </div>
            <div style={{ marginBottom: '10px', fontSize: '1.2em', color: '#fff' }}>
              Diamond & Jewelry
            </div>
            <p style={{ marginBottom: '10px', lineHeight: '1.6', color: '#fff', fontSize: '1em' }}>
              With their radiant beauty and unmatched elegance, diamonds and precious stones have always been the choice of the elite and the epitome of luxury.
            </p>
            <p style={{ marginBottom: '10px', lineHeight: '1.6', color: '#fff', fontSize: '1em' }}>
              Our customers can be completely assured of the quality, value, and price of each diamond when purchasing from Diamond Official Store. Integrity and responsibility in business are our foremost principles!
            </p>
            <p style={{ color: '#fff', lineHeight: '1.6', fontSize: '1em' }}>
              Let DIAMOND STORE elevate your life!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}