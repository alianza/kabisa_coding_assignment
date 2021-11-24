import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from "./components/Layout/Header/Header";
import Menu from "./components/Layout/Menu/Menu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/Pages/SignIn/SignIn";
import Home from "./components/Pages/Home/Home";
import Footer from "./components/Layout/Footer/Footer";
import Quote from "./components/Pages/Quote/Quote";
import MyQuotes from "./components/Pages/MyQuotes/MyQuotes";
import { Dialog, DialogTitle } from "@material-ui/core";
import Popular from "./components/Pages/Popular/Popular";
import Loader from "./components/Loader/Loader";
import useTheme from "./lib/Theme";
import { useEventListeners } from "./lib/EventListeners";
import FirebaseService from "./services/FirebaseService";
import localStorageService from "./services/localStorageService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const darkThemeKey = 'darkTheme'

function App() {
    const [open, setOpenLogoutDialog] = useState(false)
    const [darkTheme, setDarkTheme] = useState(localStorageService.getValue(darkThemeKey))
    const [user, setUser] = useState()
    const auth = getAuth()

    useEffect(() => { // Listen to the Firebase Auth state and set the local state.
        const unregisterAuthObserver = onAuthStateChanged(auth, user => { setUser(user) })
        return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
    }, [auth])

    useTheme(darkTheme)

    useEventListeners()

    const toggleMenu = () => { document.getElementById("app").classList.toggle("menu-active") }

    const toggleTheme = () => { localStorageService.setKeyValue(darkThemeKey, !darkTheme); setDarkTheme(prevTheme => !prevTheme) }

    const logOut = () => {
        FirebaseService.logout().then(() => {
            setOpenLogoutDialog(true)
                setTimeout(() => {
                    setOpenLogoutDialog(false)
                }, 1500);
            }
        );
    }

    return (
        <Router>
            <div id="app">

                <Header user={user} onMenuClick={toggleMenu} title={'Quoty'}/>

                <Menu user={user} logOut={logOut} onMenuClick={toggleMenu}/>

                <div className={'content'}>
                    <Switch>
                        <Route exact path={['/']} render={({match}) =>
                            <Home user={user} match={match}/>}/>

                        <Route exact path={['/quote/:quoteId']} render={({match}) =>
                            <Quote user={user} match={match}/>}/>

                        <Route exact path={['/quotes']} render={({match}) =>
                            <MyQuotes user={user} match={match}/>}/>

                        <Route exact path={['/popular']} render={({match}) =>
                            <Popular user={user} match={match}/>}/>

                        <Route exact path={['/login', '/profile']} render={({match}) =>
                            <SignIn user={user} logOut={logOut} match={match}/>}/>

                        <Route render={() => <h1>404 Oops...</h1>}/>
                    </Switch>
                </div>

                <Footer darkTheme={darkTheme} onThemeButtonClick={toggleTheme}/>

                <Loader/>

                <Dialog open={open}>
                    <DialogTitle id="sign-out-dialog">Successfully Signed out!</DialogTitle>
                </Dialog>

            </div>
        </Router>
    );
}

export default App;
