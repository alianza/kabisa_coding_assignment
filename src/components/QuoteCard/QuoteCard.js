import './QuoteCard.scss'
import React, { useContext, useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import ShareIcon from '@material-ui/icons/Share'
import LinkIcon from "@material-ui/icons/Link"
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver"
import ShareMenu from "../ShareMenu/ShareMenu"
import StarRating from "../StarRating/StarRating"
import getLanguage from "../../lib/Language"
import { addRating, getQuoteRatings, removeRating } from "../../services/firebaseService"
import { UserContext } from "../../App"

function QuoteCard(props) {
    const [rating, setRating] = useState({ rating: 0, timestamp: null })
    const [averageRating, setAverageRating] = useState(0)
    const [numberOfRatings, setNumberOfRatings] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null)
    const shareUrl = `https://${window.location.host}/quote/${props.quote.id}`

    const location = useLocation()

    const user = useContext(UserContext)

    const openShareMenu = (event) => { setAnchorEl(event.currentTarget) }

    const closeShareMenu = () => { setAnchorEl(null) }

    useEffect(() => { // Initial data fetch
        setRating(0) // Reset rating every time
        getQuoteRatings(props.quote, user, setRating, setAverageRating, setNumberOfRatings)
    }, [props.quote, user] )

    const createRating = (rating) => {
        setRating(rating)
        if (rating) { addRating(rating, props.quote.id, user.uid) // Update rating
        } else { removeRating(props.quote.id, user.uid) } // Remove rating
    }

    return (
        <blockquote className="quoteCard">
            <p className="quote">❝ {props.quote.quote}❞</p>
            <div className="info">
                <cite className="author">
                    <RecordVoiceOverIcon style={{marginRight: '6px'}} fontSize={"small"}/>{props.quote.author}
                </cite>
                <button className="link" onClick={openShareMenu}>Share<ShareIcon style={{marginLeft: '6px'}} fontSize={"small"}/></button>
                {!location.pathname.includes('/quote/') && <NavLink to={`/quote/${props.quote.id}`}>permalink<LinkIcon style={{marginLeft: '6px'}} fontSize={"small"}/></NavLink>}
            </div>
                <div data-tip={!user ? 'Log in to vote!' : 'Your rating!'} className="rating tooltip">
                    {rating?.timestamp && <center className="ratingDate">Rated on: <b>{new Date(rating?.timestamp).toLocaleString(getLanguage())}</b></center>}
                    {!!user && <StarRating quoteId={props.quote.id} value={rating?.rating} onChange={(event, newValue) => { createRating(newValue) }}/>}
                    <div className="averageRating">Average rating: <span className="ratingValue">{Math.round(averageRating * 100) / 100 || 'Not yet rated'}</span>
                    {!!averageRating && <span className="ratingAmount">Based on {numberOfRatings} vote{numberOfRatings > 1 && 's'}!</span>}
                    </div>
                </div>
            {anchorEl && <ShareMenu anchorEl={anchorEl} onClose={closeShareMenu} urlToShare={shareUrl} quote={props.quote}/>}
        </blockquote>
    )
}

export default QuoteCard;
