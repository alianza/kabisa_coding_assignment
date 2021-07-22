import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import firebase from "firebase/app";
import HomePage from "./components/Home/HomePage";
import Footer from "./components/Footer/Footer";
import Quote from "./components/Quote/Quote";
import { Dialog, DialogTitle } from "@material-ui/core";

function App() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        document.getElementById("app").classList.toggle("menu-active");
    }

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

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.querySelectorAll('.login-only').forEach(element => {
                element.classList.remove('hidden');
            });
            document.querySelectorAll('.logout-only').forEach(element => {
                element.classList.add('hidden');
            })
        } else {
            document.querySelectorAll('.login-only').forEach(element => {
                element.classList.add('hidden');
            })
            document.querySelectorAll('.logout-only').forEach(element => {
                element.classList.remove('hidden');
            })
        }
    })

    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();

        return function cleanup() {
            window.removeEventListener("resize", onResize);
        };
    }, [])

        return (
            <Router>
                <div id="app" className="menu-active">

                    <Header onMenuClick={toggleMenu} title={'Quoty'}/>

                    <Menu logOut={logOut} onMenuClick={toggleMenu}/>

                    <div className={'content'}>
                        <Switch>
                            <Route exact path={['/']} render={({match}) =>
                                <HomePage match={match}/>}/>

                            <Route exact path={['/quote/:quoteId']} render={({match}) =>
                                <Quote match={match}/>}/>

                            <Route exact path={['/login', '/profile']} render={({match}) =>
                                <SignIn logOut={logOut} match={match}/>}/>

                            <Route render={() => <h1>404 Oops...</h1>}/>
                        </Switch>
                    </div>

                    <Footer/>

                    <div id="loader">
                        <div/>
                    </div>

                    <Dialog open={open}>
                        <DialogTitle id="alert-dialog-title">{"Successfully Logged out!"}</DialogTitle>
                    </Dialog>

                </div>
            </Router>
        );
}

export default App;
