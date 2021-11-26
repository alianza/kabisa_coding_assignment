import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useTheme from "./lib/Theme";
import { useEventListeners } from "./lib/EventListeners";
import localStorageService from "./services/localStorageService";
import { logout } from "./services/firebaseService";

// Components
import Loader from "./components/Loader/Loader";

// Lazy loaded pages
const SignIn = React.lazy(() => import("./components/Pages/SignIn/SignIn"));
const Home = React.lazy(() => import("./components/Pages/Home/Home"));
const Quote = React.lazy(() => import("./components/Pages/Quote/Quote"));
const MyQuotes = React.lazy(() => import("./components/Pages/MyQuotes/MyQuotes"));
const Popular = React.lazy(() => import("./components/Pages/Popular/Popular"));

// Lazy loaded components
const Header = React.lazy(() => import("./components/Layout/Header/Header"));
const Menu = React.lazy(() => import("./components/Layout/Menu/Menu"));
const Footer = React.lazy(() => import("./components/Layout/Footer/Footer"));
const LogoutDialog = React.lazy(() => import("./components/LogoutDialog/LogoutDialog"));

const darkThemeKey = 'darkTheme'

function App() {
    const [open, setOpenLogoutDialog] = useState(false)
    const [darkTheme, setDarkTheme] = useState(localStorageService.getValue(darkThemeKey))
    const [user, setUser] = useState()
    const [auth, setAuth] = useState()

    useEffect(() => {
        (async function importAuth() {
            const { getAuth } = await import("firebase/auth")
            setAuth(getAuth())
        })()
    }, [])

    useEffect(() => { // Listen to the Firebase Auth state and set the local state.
        let unregisterAuthObserver
        (async function importAuthStateAndObserve() {
            if (auth) {
                const { onAuthStateChanged } = await import("firebase/auth")
                unregisterAuthObserver = onAuthStateChanged(auth, user => {
                    setUser(user)
                })
        } })()
        return () => unregisterAuthObserver && unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
    }, [auth])

    useTheme(darkTheme)

    useEventListeners()

    const toggleMenu = () => { document.getElementById("app").classList.toggle("menu-active") }

    const toggleTheme = () => { localStorageService.setKeyValue(darkThemeKey, !darkTheme); setDarkTheme(prevTheme => !prevTheme) }

    const logOut = async () => {
        logout().then(() => {
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

                    <React.Suspense fallback={<Loader active/>}>
                <Header user={user} onMenuClick={toggleMenu} title={'Quoty'}/>

                <Menu user={user} logOut={logOut} onMenuClick={toggleMenu}/>
                    </React.Suspense>

                <div className={'content'}>
                        <React.Suspense fallback={null}>
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
                        </React.Suspense>
                </div>

                    <React.Suspense fallback={<Loader active/>}>
                <Footer darkTheme={darkTheme} onThemeButtonClick={toggleTheme}/>

                <Loader/>

                <LogoutDialog open={open}/>
                    </React.Suspense>

            </div>
        </Router>
    );
}

export default App;
