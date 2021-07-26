import './QuoteCard.scss'
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FirebaseService from "../../services/FirebaseService";
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from "@material-ui/icons/Link";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import ShareMenu from "../ShareMenu/ShareMenu";
import StarRating from "../StarRating/StarRating";

function QuoteCard(props) {
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const shareUrl = `https://${window.location.host}/quote/${props.quote.id}`

    const openShareMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeShareMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => { //
        FirebaseService.getQuoteRatings(props.quote, props.user, setRating, setAverageRating, setNumberOfRatings);
    }, [props.quote, props?.user] )

    const createRating = (rating) => {
        setRating(rating)
        FirebaseService.addRating(rating, props.quote.id, props.user.uid)
    }

    return (
        <blockquote className="quoteCard">
            <p className="quote">❝ {props.quote.quote}❞</p>
            <div className="info">
                <cite className="author">
                    <RecordVoiceOverIcon style={{marginRight: '6px'}} fontSize={"small"}/>{props.quote.author}
                </cite>
                <button className="link" onClick={openShareMenu}>Share<ShareIcon style={{marginLeft: '6px'}} fontSize={"small"}/></button>
                {props.match.path !== '/quote/:quoteId' && <NavLink to={`/quote/${props.quote.id}`}>permalink
                    <LinkIcon style={{marginLeft: '6px'}} fontSize={"small"}/>
                </NavLink>}
            </div>
            <div data-tip="Log in to vote" className={`rating ${!props.user && 'tooltip'}`}>
                {!!props.user && <StarRating quoteId={props.quote.id} value={rating} onChange={(event, newValue) => { if (newValue) { createRating(newValue) } }}/>}
                <div className="averageRating">Average rating: <span className="ratingValue">{Math.round(averageRating * 100) / 100 || 'Not yet rated'}</span>
                    {!!averageRating && <span className="ratingAmount">Based on {numberOfRatings} vote{numberOfRatings > 1 && 's'}!</span>}
                </div>
            </div>
            <ShareMenu anchorEl={anchorEl} onClose={closeShareMenu} urlToShare={shareUrl} quote={props.quote}/>
        </blockquote>
    );
}

export default QuoteCard;
