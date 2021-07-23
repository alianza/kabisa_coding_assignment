import './QuoteCard.scss'
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NavLink } from "react-router-dom";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import LinkIcon from "@material-ui/icons/Link";
import { Rating } from "@material-ui/lab";
import FirebaseService from "../../services/FirebaseService";
import ShareIcon from '@material-ui/icons/Share';

function QuoteCard(props) {
    const [value, setValue] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [numberOfRatings, setNumberOfRatings] = useState(0);

    useEffect(() => {
        // const {ownRating, averageRating, numberOfRatings} = FirebaseService.getQuoteRatings(props.quote.id, props?.user?.uid)

        setValue(0)

        const dbRefObject = firebase.database().ref('quoteRatings').child(props.quote.id);

        dbRefObject.on('value', snapshot => {
            let averageRating = 0
            let numberOfRatings = 0
            snapshot.forEach(rating => {
                averageRating += rating.val().rating
                numberOfRatings++;
                if (rating.key === props?.user?.uid) {
                    setValue(rating.val().rating)
                }
            })
            setAverageRating(averageRating / snapshot.numChildren())
            setNumberOfRatings(numberOfRatings)
        })
    }, [props.quote.id, props?.user?.uid] )

    function createRating(newValue) {
        setValue(newValue)
        FirebaseService.addRating(newValue, props.quote.id, props.user.uid)
    }

    return (
        <blockquote className="quoteCard">
            <p className="quote">❝ {props.quote.quote}❞</p>
            <div className="info">
                <cite className="author"><RecordVoiceOverIcon style={{marginRight: '6px'}} fontSize={"small"}/>{props.quote.author}</cite>
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${props.quote.permalink}`}>Share<ShareIcon style={{marginLeft: '6px'}} fontSize={"small"}/></a>
                {props.match.path !== '/quote/:quoteId' &&
                <NavLink to={`/quote/${props.quote.id}`}>permalink <LinkIcon style={{marginLeft: '6px'}} fontSize={"small"}/></NavLink>}
            </div>
            <div className="rating">
                {!!props.user && <Rating
                    className="tooltip"
                    data-tip="Your rating!"
                    name={`rating for quote #${props.quote.id}`}
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
