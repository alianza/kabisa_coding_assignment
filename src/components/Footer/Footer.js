import './Footer.scss'
import React from "react";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness7Icon from '@material-ui/icons/Brightness7';

function Footer(props) {
    return (
        <div className="footer">
            <p>Quoty quotes network</p>
            {props.darkTheme ?
                <button className="button" onClick={() => props.onThemeButtonClick()}><Brightness7Icon/></button> :
                <button className="button" onClick={() => props.onThemeButtonClick()}><NightsStayIcon/></button>
            }
        </div>
    );
}

export default Footer;
