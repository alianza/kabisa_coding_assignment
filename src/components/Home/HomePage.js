import './HomePage.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";
import RefreshButton from "../RefreshButton/RefreshButton";

function HomePage(props) {
    const [quote, setQuote] = useState();

    useEffect(() => {
        fetchRandomQuote()
    }, [])

    const fetchRandomQuote = () => {
        Loader.showLoader();
        quoteService.getRandomQuote().then(quote => {
            setQuote(quote)
            console.log(quote);
            Loader.hideLoader();
        })
    }

    return (
        <div className="home">
            <div>
                <h1 className="title tooltip" data-tip="Display a random quote">Random Quote</h1>
                {quote && <QuoteCard match={props.match} user={props.user} quote={quote}/>}
            </div>
            <RefreshButton onRefresh={fetchRandomQuote}/>
        </div>
    );
}

export default HomePage;
