import './Footer.scss'
import React from "react";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7';

function Footer(props) {
    return (
        <div className="footer">
            <p>Quoty quotes network</p>
                <button className="button" aria-label="Switch theme" onClick={() => props.onThemeButtonClick()}>{props.darkTheme ? <Brightness7Icon/> : <NightsStayIcon/>}</button>
        </div>
    );
}

export default Footer;
