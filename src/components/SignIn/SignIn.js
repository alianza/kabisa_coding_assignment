import React, { useEffect, useState } from 'react';
import "./SignIn.scss"
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
    const [numberOfRatings, setNumberOfRatings] = useState(0); // Local signed-in state.
    const history = useHistory();
    const currentUser = firebase.auth().currentUser;

    useEffect(() => { // Listen to the Firebase Auth state and set the local state.
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            if (user) { history.push('/profile'); }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [history, currentUser]);

    useEffect(() => { // Get number of ratings for user
        if (props?.user?.uid) {
            const dbRefObject = firebase.database().ref(`userRatings/${props?.user?.uid}`)

            dbRefObject.on('value', snapshot => {
                setNumberOfRatings(snapshot.numChildren())
            })
        }
    }, [props?.user?.uid])

    const logOut = () => {
        props.logOut();
        history.push('/login');
    }

    if (!isSignedIn) {
        return (
            <div className="signIn">
                <h1 data-tip="Log in to vote on quotes" className="title tooltip">Login/Signup</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        );
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
                    <p>Creation date: <span>{props.user?.metadata.creationTime}!</span></p>
                    <hr/>
                    <p>Last sign on: <span>{props.user?.metadata.lastSignInTime}!</span></p>
                    <hr/>
                    <p>Number of ratings: <span>{numberOfRatings}!</span></p>
                    <hr/>
                    <button className="button" onClick={logOut}>Sign-out</button>
                </>
                }
            </div>
        );
    }
}

export default SignIn;
