import React, { useState } from 'react'
import { Link, useMatch, useResolvedPath, Outlet } from 'react-router-dom'
import './NavbarAdmin.css'
import { LogoutByButton } from '../../Auth/AuthFucntion'
import { CaretDownOutlined } from '@ant-design/icons'
export default function NavbarAdmin() {
    const [hidden, setHidden] = useState(false)
    function hoverTheList() {
        setHidden(true)
    }

    function unhoverTheList() {
        setHidden(false)
    }
    return (
        <div>
            <nav className='adminNavContainer '>
                <ul className='container-fluid' id='navbarAdminContainer'>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/admin">Admin</CustomLink>

                    <li onMouseEnter={hoverTheList} onMouseLeave={unhoverTheList}>
                        <a>Element</a> <CaretDownOutlined />
                        {hidden &&
                            <div id='childrenOfList'>
                                <CustomLink to="category">Category</CustomLink>
                                <CustomLink to="account">Account</CustomLink>
                            </div>
                        }
                    </li>
                    <CustomLink to='/'>
                        <button onClick={LogoutByButton} className='btn btn-danger btn-block'>Log out</button>
                    </CustomLink>
                </ul>

            </nav>
            <Outlet />
        </div >
    )
}
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className='listNavAdmin'>
            <Link to={to} {...props} className={isActive ? "active" : ""}>
                {children}
            </Link>
        </li >
    )
}