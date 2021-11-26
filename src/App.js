import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useTheme from "./lib/Theme";
import { useEventListeners } from "./lib/EventListeners";
import localStorageService from "./services/localStorageService";
import { logout } from "./services/firebaseService";
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Components
import Loader from "./components/Loader/Loader";
import Footer from "./components/Layout/Footer/Footer"
import Header from "./components/Layout/Header/Header"
import Menu from "./components/Layout/Menu/Menu"

// Lazy loaded pages
const SignIn = React.lazy(() => import("./components/Pages/SignIn/SignIn"));
const Home = React.lazy(() => import("./components/Pages/Home/Home"));
const Quote = React.lazy(() => import("./components/Pages/Quote/Quote"));
const MyQuotes = React.lazy(() => import("./components/Pages/MyQuotes/MyQuotes"));
const Popular = React.lazy(() => import("./components/Pages/Popular/Popular"));

// Lazy loaded components
const LogoutDialog = React.lazy(() => import("./components/LogoutDialog/LogoutDialog"));

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
        logout().then(() => {
            setOpenLogoutDialog(true)
                setTimeout(() => {
                    setOpenLogoutDialog(false)
                }, 1500);
            }
        )
    }

    return (
        <Router>
            <div id="app">
                <Header user={user} onMenuClick={toggleMenu} title={'Quoty'}/>

                <Menu user={user} logOut={logOut} onMenuClick={toggleMenu}/>

                <div className={'content'}>
                        <React.Suspense fallback={<div><h1 className="title">Loading...</h1></div>}>
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

                        <LogoutDialog open={open}/>
                        </React.Suspense>
                </div>

                <Footer darkTheme={darkTheme} onThemeButtonClick={toggleTheme}/>

                <Loader/>

            </div>
        </Router>
    );
}

export default App;
