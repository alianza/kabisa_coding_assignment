import React from "react";
import './Loader.scss'

function Loader({active}) {
    return (
        <div id="loader" className={active ? 'active' : ''}>
            <div/>
        </div>)
}

export default Loader;
