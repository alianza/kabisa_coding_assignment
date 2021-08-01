import './Quote.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";
import { useHistory } from "react-router-dom";
import LinkIcon from '@material-ui/icons/Link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Quote(props) {
    const [quote, setQuote] = useState();
    const shareUrl = `https://${window.location.host}/quote/${quote?.id}`;
    const history = useHistory();

    useEffect(() => { // Initial data fetch
        Loader.showLoader();
        quoteService.getQuote(props.match.params.quoteId).then(quote => {
            setQuote(quote)
            Loader.hideLoader();
        })
    }, [props.match.params.quoteId])

    const copyQuoteUrl = () => {
        navigator.clipboard.writeText(shareUrl).then(function() {
            document.getElementById('copy').dataset.tip = 'Copied!'
        }, function(err) { console.error('Async: Could not copy text: ', err); });
    }

    return (
        <div className="quote">
            <h1 className="title">Quote #{props.match.params.quoteId}</h1>
            {quote ? <>
                    <QuoteCard match={props.match} user={props.user} quote={quote}/>
                    <button data-tip="Copy quote url" id="copy" className="button tooltip" onClick={copyQuoteUrl}>
                        <LinkIcon/>
                    </button>
                </> :
                <div>No quote with id <b>'{props.match.params.quoteId}'</b> found!&nbsp;
                    <button data-tip="Go back" className="button back tooltip" onClick={history.goBack}>
                    <ArrowBackIcon/>
                </button></div> }
        </div>
    );
}

export default Quote;
