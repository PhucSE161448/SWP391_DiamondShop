
import './navBar.css';

import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className='navbar-expand-lg bg-body-tertiary '>
            <div className='container-fluid' id='navBarContainer'>
                <div>
                    <Link to="/" >
                        Home
                    </Link>
                </div>
                <CustomLink to="/diamond">Diamond</CustomLink>
                <CustomLink to="/ring">Engagement Rings</CustomLink>
                <CustomLink to="/a">Wedding Rings</CustomLink>
                <CustomLink to="/b">Jewelry</CustomLink>
                <CustomLink to="/c">Gifts</CustomLink>
                <CustomLink to="/d">Gemstones</CustomLink>
                <CustomLink to="/e"><img src="src\assets\img\shopping-cart (1).png" alt="" className='cartLogo' /></CustomLink>
                <CustomLink to="/login">Login</CustomLink>
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