import React from 'react';
import { useLocation } from 'react-router-dom'
import NavbarAdmin from '../../Navbar/NavbarAdmin'
export default function Product() {
  const location = useLocation();
  const pathname = location.pathname;

  // Check if the current pathname starts with '/product'
  const isProductPage = pathname.startsWith('/product');

  return (
    <div>
      {/* Render NavbarAdmin only if not on a Product page */}
      {!isProductPage && <NavbarAdmin />}

      {/* Your layout content here */}
    </div>
  )
}
