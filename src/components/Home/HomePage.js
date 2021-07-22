import './HomePage.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import { NavLink } from "react-router-dom";
import LinkIcon from '@material-ui/icons/Link';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Rating from '@material-ui/lab/Rating';
import firebase from "firebase";

function HomePage(props) {
    const [quote, setQuote] = useState();
    const [value, setValue] = useState(2);
    const [loggedIn, setLoggedIn] = useState(2);

    useEffect(() => {
        Loader.showLoader();
        quoteService.getRandomQuote().then(quote => {
            setQuote(quote)
            console.log(quote);
            Loader.hideLoader();
        })
    }, [])

    firebase.auth().onAuthStateChanged(user => {
        setLoggedIn(!!user)
    })

    return (
        <div className="home">
            <h1 className="title">Random Quote</h1>
                {quote &&
                <blockquote className="quoteCard">
                    <p className="quote">❝ {quote.quote}❞</p>
                    <div>
                        <cite className="author"><RecordVoiceOverIcon style={{marginRight: '6px'}} fontSize={"small"}/>{ quote.author}</cite>
                        <NavLink to={`/quote/${quote.id}`}>permalink <LinkIcon style={{marginLeft: '6px'}} fontSize={"small"}/></NavLink>
                    </div>
                    {loggedIn &&
                        <div>
                        <Rating
                            name="rating"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        /></div>
                    }
                </blockquote> }
        </div>
    );
}

export default HomePage;
