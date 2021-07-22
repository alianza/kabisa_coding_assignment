import './QuoteCard.scss'
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NavLink } from "react-router-dom";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import LinkIcon from "@material-ui/icons/Link";
import { Rating } from "@material-ui/lab";

function QuoteCard(props) {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState();
    const [averageRating, setAverageRating] = useState(0);
    const [numberOfRatings, setNumberOfRatings] = useState(0);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    useEffect(() => {
    const dbRefObject = firebase.database().ref().child('ratings').child(props.quote.id);

    dbRefObject.on('value', snap => {
        let averageRating = 0
        let numberOfRatings = 0
        snap.forEach(rating => {
            console.log(rating.key, rating.val());
            averageRating += rating.val().rating
            numberOfRatings++;
            if (rating.key === firebase.auth().currentUser.uid) {
                setValue(rating.val().rating)
            }
        })
        setAverageRating(averageRating / snap.numChildren())
        setNumberOfRatings(numberOfRatings)
        })
    })

    function createRating(newValue) {
        setValue(newValue)

        const ratingRef = firebase.database().ref().child('ratings').child(props.quote.id)
        const rating = {
            [user.uid]: {
            quoteId: props.quote.id,
            userId: user.uid,
            rating: newValue
            }
        }
        // const rating = {
        //     [5]: {
        //         quoteId: props.quote.id,
        //         userId: 'testUserId123',
        //         rating: 4
        //     }
        // }
        console.log(rating);
        ratingRef.update(rating)
    }

    return (
        <blockquote className="quoteCard">
            <p className="quote">❝ {props.quote.quote}❞</p>
            <div className="info">
                <cite className="author"><RecordVoiceOverIcon style={{marginRight: '6px'}} fontSize={"small"}/>{props.quote.author}</cite>
                <NavLink to={`/quote/${props.quote.id}`}>permalink <LinkIcon style={{marginLeft: '6px'}} fontSize={"small"}/></NavLink>
            </div>
            <div className="rating">
            {!!user &&
                <Rating
                    name="rating"
                    value={value}
                    onChange={(event, newValue) => { if (newValue) { createRating(newValue) } }}
                />
            }
            <div className="averageRating">Average rating: <span className="ratingValue">{Math.round(averageRating * 100) / 100 || 'Not yet rated'}</span>
                {!!averageRating && <span className="ratingAmount">Based on {numberOfRatings} vote{numberOfRatings > 1 && 's'}!</span>}
            </div>
            </div>
        </blockquote>
    );
}

export default QuoteCard;
