import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
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
import Loading from "./components/Loading/Loading"

// Lazy loaded pages
const Home = React.lazy(() => import("./components/Pages/Home/Home"))
const Quote = React.lazy(() => import("./components/Pages/Quote/Quote"))
const SignIn = React.lazy(() => import("./components/Pages/SignIn/SignIn"))
const MyQuotes = React.lazy(() => import("./components/Pages/MyQuotes/MyQuotes"))
const Popular = React.lazy(() => import("./components/Pages/Popular/Popular"))
const FourOhFour = React.lazy(() => import("./components/Pages/404/404"))
const About = React.lazy(() => import("./components/Pages/About/About"))

// Lazy loaded components
const LogoutDialog = React.lazy(() => import("./components/LogoutDialog/LogoutDialog"))

const darkThemeKey = 'darkTheme'

export const UserContext = React.createContext({})

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
                }, 1500)
            }
        )
    }

    return (
        <Router>
        <UserContext.Provider value={user}>
            <div id="app">
                <Header onMenuClick={toggleMenu} title={'Quoty'}/>

                <Menu logOut={logOut} onMenuClick={toggleMenu}/>

                <div className={'content'}>
                        <React.Suspense fallback={Loading()}>

                    <Switch>
                        <Route exact path={['/']} component={Home}/>

                        <Route exact path={['/quote/:quoteId']} component={Quote}/>

                        <Route exact path={['/quotes']} component={MyQuotes}/>

                        <Route exact path={['/popular']} component={Popular}/>

                        <Route exact path={['/login', '/profile']}><SignIn logOut={logOut}/></Route>

                        <Route exact path={['/about']} component={About}/>

                        <Route component={FourOhFour}/>
                    </Switch>

                        <LogoutDialog open={open}/>
                        </React.Suspense>
                </div>

                <Footer darkTheme={darkTheme} onThemeButtonClick={toggleTheme}/>

                <Loader/>

            </div>
        </UserContext.Provider>
        </Router>
    )
}

export default App;
