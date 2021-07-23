import './Header.scss'
import { NavLink } from "react-router-dom";

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
                    <h3>logged in as: <NavLink to={'/profile'}>{props.user.displayName}</NavLink></h3> :
                    <NavLink to={'/login'}><h3>Log-in</h3></NavLink>}
            </div>
        </div>
    );
}

export default Header;
