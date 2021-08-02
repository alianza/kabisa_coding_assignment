import './Header.scss'
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Header(props) {

    return (
        <div className="header">
            <div className="left">
                <div onClick={e => props.onMenuClick(e)} className="menu-icon">
                    <div/>
                    <div/>
                    <div/>
                </div>
                <h1 className="header-title">{props.title}</h1>
            </div>
            <div className="header-status">
                {props.user ?
                    <div><h3>logged in as: </h3><NavLink aria-label="Profile" to={'/profile'}><h3>{props.user.displayName}</h3><AccountCircleIcon className="svgButton"/></NavLink></div> :
                    <NavLink aria-label="Sign-in" to={'/login'}><h3>Log-in</h3></NavLink>}
            </div>
        </div>
    );
}

export default Header;
