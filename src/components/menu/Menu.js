import './Menu.scss'
import { NavLink, useLocation } from "react-router-dom";
import scrollToTop from "../../lib/ScrollToTop";
import { useEffect, useState } from "react";
import firebase from "firebase";

function Menu(props) {
    const { pathname } = useLocation();

    const about = () => {
        alert('This is a react based quotes Application!\n' +
            'for the kabisa coding assigment!\n' +
            'Made by Jan-Willem van Bremen - 2021');
    }

    const closeMenuIfMobile = () => {
        if (window.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active');
        }
    }

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    });

    return (
        <div className="menu">
            <div onClick={e => props.onMenuClick(e)} className="menu-close">✖</div>
            <h1>Menu</h1>
            <ul className="menu-top" onClick={() => closeMenuIfMobile()}>
                <li><NavLink to={'/'} isActive={ (match) => pathname.includes('/page') || match.url === '/'} activeClassName={'active'} onClick={() => scrollToTop()}>Home</NavLink></li>
                {!isSignedIn &&
                <li className="logout-only"><NavLink to={'/login'} isActive={ () => pathname.includes('/login') } activeClassName={'active'}>Login</NavLink></li>
                }
                {isSignedIn && <>
                    <li className="login-only"><NavLink to={'/profile'} isActive={() => pathname.includes('/profile')} activeClassName={'active'}>Profile</NavLink></li>
                    <li className="login-only"><span onClick={() => props.logOut()}>Sign-Out</span></li>
                    <li className="login-only"><NavLink to={'/my_quotes'} isActive={() => pathname.includes('/my_quotes')} activeClassName={'active'}>My Quotes</NavLink></li>
                </>}
                <li onClick={about}>About</li>
            </ul>
            <p className="menu-bottom">Jan-Willem van Bremen</p>
        </div>
    );
}

export default Menu;
