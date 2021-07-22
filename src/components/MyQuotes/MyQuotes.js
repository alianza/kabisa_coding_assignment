import './MyCuotes.scss'
import React, { useEffect, useState } from "react";
import Loader from "../../lib/Loader";
import QuoteCard from "../QuoteCard/QuoteCard";
import firebase from "firebase";

function MyQuotes() {
    const [quoteList, setQuoteList] = useState();

    useEffect(() => {
        Loader.showLoader();
        const dbRefObject = firebase.database().ref().child('ratings');

    }, [])

    return (
        <div className="home">
            <h1 className="title">Random Quote</h1>
                {quoteList.map(quote =>
                    (<QuoteCard quote={quote}/>)
                )}
        </div>
    );
}

export default MyQuotes;
