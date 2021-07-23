import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Menu from "./components/menu/Menu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import firebase from "firebase/app";
import HomePage from "./components/Home/HomePage";
import Footer from "./components/Footer/Footer";
import Quote from "./components/Quote/Quote";
import MyQuotes from "./components/MyQuotes/MyQuotes";
import { Dialog, DialogTitle } from "@material-ui/core";
import Popular from "./components/Popular/Popular";

function App() {
    const [open, setOpen] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const [user, setUser] = useState();

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => { setUser(user) });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    });

    useEffect(() => {
        console.log('darkTheme', darkTheme)
        if (darkTheme) { document.body.dataset.theme = 'dark' }
        else { document.body.dataset.theme = '' }
    }, [darkTheme])

    useEffect(() => {
        const matchDarkMedia = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
        matchDarkMedia.addEventListener('change', darkModeListener)

        function darkModeListener(e) {
            if (e.matches) { setDarkTheme(true) } // Prefers dark mode
            else { setDarkTheme(false) }
        }

        return function cleanup() { matchDarkMedia.removeEventListener('change', darkModeListener) }
    }, [])

    const toggleMenu = () => { document.getElementById("app").classList.toggle("menu-active") }

    const toggleTheme = () => { setDarkTheme(prevTheme => !prevTheme) }

    const onResize = () => {
        if (window.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active');
        } else if (window.innerWidth > 900) {
            document.getElementById('app').classList.add('menu-active');
        }
    }

    const logOut = () => {
        setOpen(true)
        firebase.auth().signOut().then(() => {
            setTimeout(() => {
                setOpen(false)
            }, 1500);
        })
    }

    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();

        return function cleanup() { window.removeEventListener("resize", onResize) };
    }, [])

    return (
        <Router>
            <div id="app" className="menu-active">

                <Header user={user} onMenuClick={toggleMenu} title={'Quoty'}/>

                <Menu user={user} logOut={logOut} onMenuClick={toggleMenu}/>

                <div className={'content'}>
                    <Switch>
                        <Route exact path={['/']} render={({match}) =>
                            <HomePage user={user} match={match}/>}/>

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

                <div id="loader">
                    <div/>
                </div>

                <Dialog open={open}>
                    <DialogTitle id="alert-dialog-title">Successfully Signed out!</DialogTitle>
                </Dialog>

            </div>
        </Router>
    );
}

export default App;
