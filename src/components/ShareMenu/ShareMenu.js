import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";

function ShareMenu(props: { anchorEl: unknown, onClose: () => void, urlToShare: string, quote: any }) {
    return (<Menu
        id="share-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
    >
        <MenuItem onClick={props.onClose}>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${props.urlToShare}`} target="_blank" rel="noreferrer">
                <FacebookIcon/>
            </a>
        </MenuItem>
        <MenuItem onClick={props.onClose}>
            <a href={`https://twitter.com/share?url=${props.urlToShare}&text=Quote by: ${props.quote.author}&hashtags=quotes`}
               target="_blank" rel="noreferrer">
                <TwitterIcon/>
            </a>
        </MenuItem>
        <MenuItem onClick={props.onClose}>
            <a href={`mailto:?Subject=Quote by: ${props.quote.author}&Body=Read this quote on the Quoty network ${props.urlToShare}`}
               target="_blank" rel="noreferrer">
                <EmailIcon/>
            </a>
        </MenuItem>
    </Menu>)
}

export default ShareMenu;
