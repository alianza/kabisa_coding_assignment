import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "./SignIn.scss"
import firebase from 'firebase';
import { useHistory } from "react-router-dom";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

function SignIn(props) {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const history = useHistory();
    const currentUser = firebase.auth().currentUser

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            if (user) { history.push('/profile'); }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [history, currentUser]);

    const logOut = () => {
        props.logOut();
        history.push('/login');
    }

    if (!isSignedIn) {
        return (
            <div className="signIn">
                <h1 className="title">Login/Signup</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        );
    } else {
        return (
            <div className="signIn">
                <h1 className="title">My Profile</h1>
                {firebase.auth().currentUser &&
                <>
                    <p>Welcome: <span>{firebase.auth().currentUser.displayName}!</span> You are now signed-in!</p>
                    <hr/>
                    <p>Email: <span>{firebase.auth().currentUser.email}!</span></p>
                    <hr/>
                    <p>Creation date: <span>{firebase.auth().currentUser.metadata.creationTime}!</span></p>
                    <hr/>
                    <p>Last sign on: <span>{firebase.auth().currentUser.metadata.lastSignInTime}!</span></p>
                    <hr/>
                    <button className="button" onClick={logOut}>Sign-out</button>
                </>
                }
            </div>
        );
    }
}

export default SignIn;
