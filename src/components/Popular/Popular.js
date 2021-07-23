import './Popular.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";

function Popular(props) {
    const [quoteList, setQuoteList] = useState([]);

    useEffect(() => {
        fetchPopularQuotes()
    }, [])

    const fetchPopularQuotes = () => {
        Loader.showLoader();
        quoteService.getPopularQuotes().then(quotes => {
            setQuoteList(quotes)
            Loader.hideLoader();
        })
    }

    return (
        <div className="popular">
            <div>
                <h1 className="title">Popular Quotes</h1>
                {quoteList.map(quote => <QuoteCard key={quote.id} quote={quote} user={props.user} match={props.match}/>)}
            </div>
        </div>
    );
}

export default Popular;
