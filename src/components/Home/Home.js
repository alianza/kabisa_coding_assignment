import './Home.scss'
import React, { useEffect, useState } from "react";
import quoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";
import RefreshButton from "../RefreshButton/RefreshButton";
import TimerOffIcon from '@material-ui/icons/TimerOff';
import TimerIcon from '@material-ui/icons/Timer';

function Home(props) {
    const [quote, setQuote] = useState();
    const [slideshow, setSlideShow] = useState(false);

    useEffect(() => { // Start slideshow timer
        let timer;
        if (slideshow) {
            timer = setTimeout(() => {
                fetchRandomQuote()
            }, 8000);
        }

        return function cleanup () { clearTimeout(timer); }
    }, [slideshow])

    useEffect(() => { // Initial data fetch
        fetchRandomQuote()
    }, [])

    const fetchRandomQuote = () => {
        Loader.showLoader();
        quoteService.getRandomQuote().then(quote => {
            setQuote(quote)
            Loader.hideLoader();
        })
    }

    return (
        <div className="home">
            <div>
                <div className="top">
                    <h1 className="title tooltip" data-tip="Display a random quote">Random Quote</h1>
                    {slideshow ?
                        <span data-tip="Stop slideshow" className="tooltip"><TimerOffIcon onClick={() => setSlideShow(false)} className="svgButton"/></span> :
                        <span data-tip="Start slideshow" className="tooltip"><TimerIcon onClick={() => setSlideShow(true)} className="svgButton"/></span>}
                </div>
                {quote && <QuoteCard match={props.match} user={props.user} quote={quote}/>}
            </div>
            <RefreshButton onRefresh={fetchRandomQuote}/>
        </div>
    );
}

export default Home;
