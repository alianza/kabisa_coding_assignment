import './MyCuotes.scss'
import React, { useEffect, useState } from "react";
import QuoteCard from "../QuoteCard/QuoteCard";
import firebase from "firebase";
import QuoteService from "../../services/QuoteService";
import Loader from "../../lib/Loader";
import { NavLink } from "react-router-dom";

function MyQuotes(props) {
    const [quoteRefList, setQuoteRefList] = useState([]);
    const [quoteList, setQuoteList] = useState([]);
    const [numberOfQuotes, setNumberOfQuotes] = useState(0);

    useEffect(() => {
        Loader.showLoader();
        if (props?.user?.uid) {
            const dbRefObject = firebase.database().ref(`userRatings/${props?.user?.uid}`)

            dbRefObject.on('value', snapshot => {
                setNumberOfQuotes(snapshot.numChildren())
                snapshot.forEach(quoteRating => {
                    setQuoteRefList(prevQuoteRefs => [...prevQuoteRefs, quoteRating.val()])
                })
            })
        }
    }, [props?.user?.uid])

    useEffect(() => {
        if (quoteRefList?.length === numberOfQuotes) {
            quoteRefList.forEach(quoteRef => {
                QuoteService.getQuote(quoteRef.quoteId).then(quote => {
                    setQuoteList(prevQuotes => [...prevQuotes, quote])
                })
            });
        }
        Loader.hideLoader()
    }, [quoteRefList, numberOfQuotes])

    return (
        <div className="quotes">
            <h1 className="title">My Quotes</h1>
            {quoteList?.length ? quoteList.map(quote =>
                    (<QuoteCard key={quote.id} quote={quote} user={props.user} match={props.match}/>)
                ) :
            <div>You have not rated any quotes yet... <br /> Rate some quotes via the <NavLink to={"/"}>homepage</NavLink></div>
            }

        </div>
    );
}

export default MyQuotes;
