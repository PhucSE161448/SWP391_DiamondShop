import React, { useState } from 'react'
import { Link, useMatch, useResolvedPath, Outlet } from 'react-router-dom'
import './NavbarAdmin.css'
import { LogoutByButton } from '../../Auth/AuthFunction'
import { CaretDownOutlined } from '@ant-design/icons'
import { Layout, Menu, } from 'antd';
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
            <Menu theme="dark" className='container-fluid' id='navbarAdminContainer'>
                <Menu.Item>
                    <CustomLink to="/">Home</CustomLink>
                </Menu.Item>
                <Menu.Item>
                    <CustomLink to="/admin">Admin</CustomLink>
                </Menu.Item>

                <Menu.SubMenu key="sub1" title={<span className='Element'>Element</span>} mode="vertical">
                    <Menu.Item key="sub1-1">
                        <CustomLink to="account">Account</CustomLink>
                    </Menu.Item>
                    <Menu.Item key="sub1-2">
                        <CustomLink to="category">Category</CustomLink>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item>
                    <CustomLink to='/'>
                        <button onClick={LogoutByButton} className='btn btn-danger btn-block'>Log out</button>
                    </CustomLink>
                </Menu.Item>

            </Menu>

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