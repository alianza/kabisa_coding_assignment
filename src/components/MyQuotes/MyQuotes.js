import './MyCuotes.scss'
import React, { useEffect, useState } from "react";
import QuoteCard from "../QuoteCard/QuoteCard";
import firebase from "firebase";

function MyQuotes(props) {
    const [quoteList, setQuoteList] = useState([]);
    console.log(props);

    useEffect(() => {
        console.log(props?.user?.uid);
        if (props?.user?.uid) {
            const dbRefObject = firebase.database().ref().child('ratings').child('*').equalTo(props.user.uid);

            dbRefObject.on('value', snapshot => {
                console.log(snapshot.val());
            })
        }
    }, [props.user?.uid])

    return (
        <div className="home">
            <h1 className="title">My Quotes</h1>
                {quoteList.map(quote =>
                    (<QuoteCard quote={quote}/>)
                )}
        </div>
    );
}

export default MyQuotes;
