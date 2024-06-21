import React from 'react';
import { useLocation } from 'react-router-dom'
import NavbarAdmin from '../../Navbar/NavbarAdmin'
export default function Diamond() {
  const location = useLocation();
  const pathname = location.pathname;

  const isDiamond = pathname.startsWith('/diamond');

  return (
    <div>
      {!isDiamond && <NavbarAdmin />}

      {/* Your layout content here */}
    </div>
  )
}