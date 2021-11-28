import React, { useContext, useEffect, useState } from 'react'
import "./SignIn.scss"
import { Link, useHistory } from "react-router-dom"
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import getLanguage from "../../../lib/Language"
import { getNumberOrRatings } from "../../../services/firebaseService"
import { UserContext } from "../../../App"

const uiConfig = { // Configure FirebaseUI.
    signInFlow: 'popup', // Popup signin flow rather than redirect flow.
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/profile',
    // callbacks: { // Avoid redirects after sign-in. (Leaves user metadata undefined after login in version 9 of firebase)
    //     signInSuccessWithAuthResult: () => false,
    // },
};

function SignIn(props) {
    const [numberOfRatings, setNumberOfRatings] = useState(0)
    const history = useHistory()

    const user = useContext(UserContext)

    useEffect(() => { // Redirect on successful login
        if (user) { history.push('/profile') }
    }, [user, history])

    useEffect(() => { // Get number of ratings for current user
        getNumberOrRatings(user?.uid, setNumberOfRatings)
    }, [user?.uid])

    const logOut = () => {
        props.logOut()
        history.push('/login')
    }

    if (user !== undefined && !user) {
        return (
            <div className="signIn">
                <h1 data-tip="Log in to vote on quotes" className="title tooltip">Login/Signup</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()}/>
            </div>
        )
    } else {
        return (
            <div className="signIn">
                <h1 className="title tooltip" data-tip="Your profile information">My Profile</h1>
                {user &&
                <>
                    <p>Welcome: <span>{user?.displayName}!</span> You are now signed-in!</p>
                    <hr/>
                    <p>Email: <span>{user?.email}!</span></p>
                    <hr/>
                    <p>Creation date: <span>{new Date(user?.metadata.creationTime).toLocaleString(getLanguage())}!</span></p>
                    <hr/>
                    <p>Last sign on: <span>{new Date(user?.metadata.lastSignInTime).toLocaleString(getLanguage())}!</span></p>
                    <hr/>
                    <p>Number of ratings: <Link to={'/quotes'}><span>{numberOfRatings}!</span></Link></p>
                    <hr/>
                    <button className="button" onClick={logOut}>Sign-out</button>
                </>
                }
            </div>
        )
    }
}

export default SignIn;
