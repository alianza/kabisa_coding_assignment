import './Popular.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

function Popular(props) {
    const [quoteList, setQuoteList] = useState([]);

    useEffect(() => { // Initial data fetch
        fetchPopularQuotes()
    }, [])

    const fetchPopularQuotes = () => {
        Loader.showLoader()
        quoteService.getPopularQuotes().then(quotes => {
            setQuoteList(quotes)
            Loader.hideLoader()
        })
    }

    return (
        <div className="popular">
            <div>
                <h1 className="title tooltip" data-tip="Display popular quotes">Popular Quotes</h1>
                {quoteList.map(quote => <QuoteCard key={quote.id} quote={quote} user={props.user} match={props.match}/>)}
            </div>
            <ScrollToTopButton/>
        </div>
    );
}

export default Popular;
