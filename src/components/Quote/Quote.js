import './Quote.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";

function Quote(props) {
    const [quote, setQuote] = useState();

    useEffect(() => {
        Loader.showLoader();
        quoteService.getQuote(props.match.params.quoteId).then(quote => {
            setQuote(quote)
            Loader.hideLoader();
        })
    }, [props.match.params.quoteId])

    return (
        <div className="quote">
            <h1 className="title">Quote #{props.match.params.quoteId}</h1>
                {quote ? <QuoteCard quote={quote}/> : <div>No quote with id '{props.match.params.quoteId}' found!</div> }
        </div>
    );
}

export default Quote;
