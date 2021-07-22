import './Header.scss'
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NavLink } from "react-router-dom";

function Header(props) {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    });

    return (
        <div className="header">
            <div className="left">
                <div onClick={e => props.onMenuClick(e)} className="menu-icon">
                    <div/>
                    <div/>
                    <div/>
                </div>
                <h1 className="header-title">{props.title}</h1>
            </div>
            <div className="header-status">
                {isSignedIn && firebase.auth().currentUser ?
                    <h3>logged in as: <NavLink to={'/profile'}>{firebase.auth().currentUser.displayName}</NavLink></h3> :
                    <NavLink to={'/login'}><h3>Log-in</h3></NavLink>}
            </div>
        </div>
    );
}

export default Header;
