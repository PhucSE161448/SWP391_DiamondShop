import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div style={{
      backgroundColor: '#001429',
      color: '#fff',
      padding: '20px 0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',

        alignItems: 'center'
      }}>
        <div>
          <h1
            onClick={() => navigate('/policyPage')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              cursor: 'pointer',
              textDecoration: isHovered ? 'underline' : 'none'
            }}>
            Policy Page
          </h1>
        </div>
        <div>
          <div>
            <h5>Diamond Shop</h5>
          </div>
          <div>
            <h5>© {new Date().getFullYear()} Diamond Shop</h5>
          </div>
          <div>
            <h5>
              Lot E2a-7, Road D1, Long Thanh My, Thu Duc City, Ho Chi Minh City
            </h5>
          </div>
          <div>
            <h5>
              Phone: 012 3456789 - Fax: 012 3456789
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}
