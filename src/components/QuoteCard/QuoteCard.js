import './QuoteCard.scss'
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { NavLink } from "react-router-dom";
import FirebaseService from "../../services/FirebaseService";
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from "@material-ui/icons/Link";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import StarRating from "../StarRating/StarRating";
import ShareMenu from "../ShareMenu/ShareMenu";

function QuoteCard(props) {
    const [value, setValue] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const urlToShare = `https://${window.location.host}/quote/${props.quote.id}`

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <cite className="author">
                    <RecordVoiceOverIcon style={{marginRight: '6px'}} fontSize={"small"}/>{props.quote.author}
                </cite>
                <button className="link" onClick={handleClick}>Share
                    <ShareIcon style={{marginLeft: '6px'}} fontSize={"small"}/>
                </button>
                {props.match.path !== '/quote/:quoteId' && <NavLink to={`/quote/${props.quote.id}`}>permalink
                    <LinkIcon style={{marginLeft: '6px'}} fontSize={"small"}/>
                </NavLink>}
            </div>
            <div className="rating">
                {!!props.user && <StarRating quote={props.quote} value={value} onChange={(newValue) => { if (newValue) { createRating(newValue) } }}/>}
                <div className="averageRating">Average rating: <span
                    className="ratingValue">{Math.round(averageRating * 100) / 100 || 'Not yet rated'}</span>
                    {!!averageRating &&
                    <span className="ratingAmount">Based on {numberOfRatings} vote{numberOfRatings > 1 && 's'}!</span>}
                </div>
            </div>
            <ShareMenu anchorEl={anchorEl} onClose={handleClose} urlToShare={urlToShare} quote={props.quote}/>
        </blockquote>
    );
}

export default QuoteCard;
