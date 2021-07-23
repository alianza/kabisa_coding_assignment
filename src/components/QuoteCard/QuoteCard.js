import './QuoteCard.scss'
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NavLink } from "react-router-dom";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import LinkIcon from "@material-ui/icons/Link";
import { Rating } from "@material-ui/lab";

function QuoteCard(props) {
    const [value, setValue] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [numberOfRatings, setNumberOfRatings] = useState(0);

    useEffect(() => {
        setValue(0)

        const dbRefObject = firebase.database().ref().child('ratings').child(props.quote.id);

        dbRefObject.on('value', snapshot => {
            let averageRating = 0
            let numberOfRatings = 0
            snapshot.forEach(rating => {
                averageRating += rating.val().rating
                numberOfRatings++;
                if (rating.key === firebase.auth().currentUser.uid) {
                    setValue(rating.val().rating)
                }
            })
            setAverageRating(averageRating / snapshot.numChildren())
            setNumberOfRatings(numberOfRatings)
        })
    })

    function createRating(newValue) {
        setValue(newValue)

        const ratingRef = firebase.database().ref().child('ratings').child(props.quote.id)
        const rating = {
            [props.user.uid]: {
                quoteId: props.quote.id,
                userId: props.user.uid,
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
                {props.match.path !== '/quote/:quoteId' &&
                <NavLink to={`/quote/${props.quote.id}`}>permalink <LinkIcon style={{marginLeft: '6px'}} fontSize={"small"}/></NavLink>}
            </div>
            <div className="rating">
                {!!props.user && <Rating
                    name="rating"
                    value={value}
                    onChange={(event, newValue) => { if (newValue) { createRating(newValue) }}}
                /> }
                <div className="averageRating">Average rating: <span
                    className="ratingValue">{Math.round(averageRating * 100) / 100 || 'Not yet rated'}</span>
                    {!!averageRating && <span className="ratingAmount">Based on {numberOfRatings} vote{numberOfRatings > 1 && 's'}!</span>}
                </div>
            </div>
        </blockquote>
    );
}

export default QuoteCard;
