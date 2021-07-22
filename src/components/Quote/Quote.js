import './Quote.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";

function Quote(props) {
    const [quote, setQuote] = useState();

    useEffect(() => {
        Loader.showLoader();
        quoteService.getQuote(props.match.params.quoteId).then(quote => {
            setQuote(quote)
            console.log(quote);
            Loader.hideLoader();
        })
    }, [props.match.params.quoteId])

    return (
        <div className="quote">
            <h1 className="title">Quote #{props.match.params.quoteId}</h1>
                {quote ?
                <blockquote className="quoteCard">
                    <p>❝ {quote.quote}❞</p>
                    <p>{quote.author}</p>
                </blockquote> :
                    <div>No quote with id '{props.match.params.quoteId}' found!</div>
                }
        </div>
    );
}

export default Quote;
