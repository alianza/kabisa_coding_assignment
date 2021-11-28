import { Link } from "react-router-dom"
import React from "react"

function FourOhFour() {
    return (
        <div>
            <h1 className="title">404 Oops...</h1>
            <p>Page not found! Return <Link to={'/'}><b>home</b></Link>.
            </p>
        </div>
    )
}

export default FourOhFour
