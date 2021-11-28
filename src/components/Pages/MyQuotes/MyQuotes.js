import './MyCuotes.scss'
import React, { useContext, useEffect, useState } from "react"
import QuoteCard from "../../QuoteCard/QuoteCard"
import QuoteService from "../../../services/QuoteService"
import Loader from "../../../lib/Loader"
import { NavLink } from "react-router-dom"
import BackToTopButton from "../../Buttons/ScrollToTopButton/ScrollToTopButton"
import { getMyQuotes } from "../../../services/firebaseService"
import { UserContext } from "../../../App"

function MyQuotes() {
    const [quoteRefList, setQuoteRefList] = useState([])
    const [quoteList, setQuoteList] = useState([])
    const [numberOfQuotes, setNumberOfQuotes] = useState()

    const user = useContext(UserContext)

    useEffect(() => { // Initial data fetch
        getMyQuotes(user).then(({numberOfQuotes, quoteRefList}) => {
            if (numberOfQuotes === 0) { Loader.hideLoader() } else { Loader.showLoader() }
            setNumberOfQuotes(numberOfQuotes)
            setQuoteRefList(quoteRefList)
        })
    }, [user])

    useEffect(() => { // Iterate through Quote references and retrieve Quotes
        if (quoteRefList?.length === numberOfQuotes) {
            quoteRefList.forEach((quoteRef, index) => {
                QuoteService.getQuote(quoteRef.quoteId).then(quote => {
                    setQuoteList(prevQuotes => [...prevQuotes, quote])
                    if (index >= numberOfQuotes - 1) {
                        Loader.hideLoader()
                    }})
            })
        }
    }, [quoteRefList, numberOfQuotes])

    return (
        <div className="quotes">
            <h1 className="title tooltip" data-tip="All quotes you voted for">My Quotes</h1>
            {quoteList?.length || numberOfQuotes !== 0 ? quoteList.map(quote =>
                <QuoteCard key={quote.id} quote={quote}/>
                ) :
                <div className="noQuotes">You have not rated any quotes yet... <br/> Rate some quotes via the&nbsp;
                    <NavLink to={"/"}>homepage</NavLink>.
                </div>
            }
            {!!quoteList?.length && <BackToTopButton/>}
        </div>
    )
}

export default MyQuotes;
