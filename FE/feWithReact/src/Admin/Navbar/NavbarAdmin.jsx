import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './NavbarAdmin.css'
export default function NavbarAdmin() {
    return (
        <nav className='navbar-expand-lg bg-body-tertiary '>
            <div className='container-fluid' id='navbarAdminContainer'>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/admin/">Admin</CustomLink>
                <CustomLink to="/admin/caratWeight">Carat Weight</CustomLink>
                <CustomLink to="/admin/clarity">Clarity</CustomLink>
                <CustomLink to="/admin/cut">Cut</CustomLink>
                <CustomLink to="/admin/origin">Origin</CustomLink>
                <CustomLink to="/admin/account">Account</CustomLink>
            </div>

        </nav>
    )
}
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <div>
            <Link to={to} {...props} className={isActive ? "active" : ""}>
                {children}
            </Link>
        </div >
    )
}