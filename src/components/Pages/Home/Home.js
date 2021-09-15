import './Home.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../../services/QuoteService";
import Loader from "../../../lib/Loader";
import QuoteCard from "../../QuoteCard/QuoteCard";
import RefreshButton from "../../Buttons/RefreshButton/RefreshButton";
import SlideshowButton from "../../Buttons/SlideshowButton/SlideshowButton";

function Home(props) {
    const [quote, setQuote] = useState()

    useEffect(() => { // Initial data fetch
        fetchRandomQuote()
    }, [])

    const fetchRandomQuote = () => {
        Loader.showLoader()
        quoteService.getRandomQuote().then(quote => {
            setQuote(quote)
            Loader.hideLoader()
        })
    }

    return (
        <div className="home">
            <div>
                <div className="top">
                    <h1 className="title tooltip" data-tip="Display a random quote">Random Quote</h1>
                    <SlideshowButton fetchRandomQuote={fetchRandomQuote}/>
                </div>
                {quote && <QuoteCard match={props.match} user={props.user} quote={quote}/>}
            </div>
            <RefreshButton onRefresh={fetchRandomQuote}/>
        </div>
    );
}

export default Home;
