import './Menu.scss'
import { NavLink, useLocation } from "react-router-dom";

function Menu(props) {
    const { pathname } = useLocation()

    const closeMenuIfMobile = () => {
        if (window.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active')
        }
    }

    return (
        <div className="menu">
            <div onClick={e => props.onMenuClick(e)} className="menu-close">✖</div>
            <h1>Menu</h1>
            <ul className="menu-top" onClick={() => closeMenuIfMobile()}>
                <li><NavLink to={'/'} isActive={ (match) => pathname.includes('/page') || match.url === '/'}>Home</NavLink></li>
                <li><NavLink to={'/popular'} isActive={() => pathname.includes('/popular')}>Popular Quotes</NavLink></li>
                {!props.user ?
                <li><NavLink to={'/login'} isActive={ () => pathname.includes('/login') }>Login</NavLink></li>
                    :
                <>
                    <li><NavLink to={'/profile'} isActive={() => pathname.includes('/profile')}>Profile</NavLink></li>
                    <li><NavLink to={'/quotes'} isActive={() => pathname.includes('/quotes')}>My Quotes</NavLink></li>
                    <li><NavLink to={'/'} activeClassName={''} onClick={() => props.logOut()}><span>Sign-Out</span></NavLink></li>
                </>
                }
                <li><NavLink to={'/about'} isActive={() => pathname.includes('/about')}><span>About</span></NavLink></li>
            </ul>
            <p className="menu-bottom">Jan-Willem van Bremen</p>
        </div>
    )
}

export default Menu;
