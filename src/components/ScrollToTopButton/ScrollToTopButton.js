import scrollToTop from "../../lib/ScrollToTop";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React from "react";
import './ScrollToTopButton.scss'

function ScrollToTopButton() {
    return <button className="button backToTop" onClick={scrollToTop}><ArrowUpwardIcon/></button>;
}

export default ScrollToTopButton;
