import './Menu.scss'
import { NavLink, useLocation } from "react-router-dom";

function Menu(props) {
    const { pathname } = useLocation();

    const about = () => {
        alert('This is a react based quotes Application!\n' +
            'For the kabisa coding assigment!\n' +
            'Made by Jan-Willem van Bremen - 2021');
    }

    const closeMenuIfMobile = () => {
        if (window.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active');
        }
    }

    return (
        <div className="menu">
            <div onClick={e => props.onMenuClick(e)} className="menu-close">✖</div>
            <h1>Menu</h1>
            <ul className="menu-top" onClick={() => closeMenuIfMobile()}>
                <li><NavLink to={'/'} isActive={ (match) => pathname.includes('/page') || match.url === '/'} activeClassName={'active'}>Home</NavLink></li>
                <li><NavLink to={'/popular'} isActive={() => pathname.includes('/popular')} activeClassName={'active'}>Popular Quotes</NavLink></li>
                {!props.user ?
                <li><NavLink to={'/login'} isActive={ () => pathname.includes('/login') } activeClassName={'active'}>Login</NavLink></li>
                    :
                <>
                    <li><NavLink to={'/profile'} isActive={() => pathname.includes('/profile')} activeClassName={'active'}>Profile</NavLink></li>
                    <li><NavLink to={'/quotes'} isActive={() => pathname.includes('/quotes')} activeClassName={'active'}>My Quotes</NavLink></li>
                    <li><NavLink to={'/'} activeClassName={'none'} onClick={() => props.logOut()}><span>Sign-Out</span></NavLink></li>
                </>
                }
                <li onClick={about}>About</li>
            </ul>
            <p className="menu-bottom">Jan-Willem van Bremen</p>
        </div>
    );
}

export default Menu;
