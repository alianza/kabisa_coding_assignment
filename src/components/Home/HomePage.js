import './HomePage.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";

function HomePage() {
    const [quote, setQuote] = useState();

    useEffect(() => {
        Loader.showLoader();
        quoteService.getRandomQuote().then(quote => {
            setQuote(quote)
            console.log(quote);
            Loader.hideLoader();
        })
    }, [])

    return (
        <div className="home">
            <h1 className="title">Random Quote</h1>
                {quote && <QuoteCard quote={quote}/> }
        </div>
    );
}

export default HomePage;
