import React, { useEffect, useState } from 'react';
import "./SignIn.scss"
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import getLanguage from "../../../lib/Language";
import { getNumberOrRatings } from "../../../services/firebaseService";

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
    const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.
    const [numberOfRatings, setNumberOfRatings] = useState(0)
    const auth = getAuth()
    const history = useHistory()

    useEffect(() => { // Listen to the Firebase Auth state and set the local state.
        const unregisterAuthObserver = onAuthStateChanged(auth, user => {
            setIsSignedIn(!!user)
            if (user) { history.push('/profile') }
        })
        return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
    }, [auth, history])

    useEffect(() => { // Get number of ratings for current user
        getNumberOrRatings(props.user?.uid, setNumberOfRatings)
    }, [props?.user?.uid])

    const logOut = () => {
        props.logOut()
        history.push('/login')
    }

    if (!isSignedIn) {
        return (
            <div className="signIn">
                <h1 data-tip="Log in to vote on quotes" className="title tooltip">Login/Signup</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </div>
        )
    } else {
        return (
            <div className="signIn">
                <h1 className="title tooltip" data-tip="Your profile information">My Profile</h1>
                {props.user &&
                <>
                    <p>Welcome: <span>{props.user?.displayName}!</span> You are now signed-in!</p>
                    <hr/>
                    <p>Email: <span>{props.user?.email}!</span></p>
                    <hr/>
                    <p>Creation date: <span>{new Date(props.user?.metadata.creationTime).toLocaleString(getLanguage())}!</span></p>
                    <hr/>
                    <p>Last sign on: <span>{new Date(props.user?.metadata.lastSignInTime).toLocaleString(getLanguage())}!</span></p>
                    <hr/>
                    <p>Number of ratings: <span>{numberOfRatings}!</span></p>
                    <hr/>
                    <button className="button" onClick={logOut}>Sign-out</button>
                </>
                }
            </div>
        )
    }
}

export default SignIn;
