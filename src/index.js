import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyABvMNKLEoX1Z67xRgzFMQvQFIZ5wOkxy4",
    authDomain: "kabisa-coding-assignment-jw.firebaseapp.com",
    projectId: "kabisa-coding-assignment-jw",
    storageBucket: "kabisa-coding-assignment-jw.appspot.com",
    messagingSenderId: "543412482975",
    appId: "1:543412482975:web:d4464aa22a7bb1c93843aa",
    databaseURL: "https://kabisa-coding-assignment-jw-default-rtdb.europe-west1.firebasedatabase.app/",
    measurementId: "G-4L0QHDM97F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.database();
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
