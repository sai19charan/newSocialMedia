import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {logoutCall} from '../../apiCalls'

export default function Topbar() {
  const { user,dispatch } = useContext(AuthContext);
  const handleClick = () => {
    logoutCall(
      dispatch
    );
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
       <Link to="/" style={{textDecoration:"none"}}>
       <span className="logo">SocialBuzz</span>
       </Link>
       
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture||"https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1"} alt="" className="topbarImg"/>
        </Link> 
        <span className="topbarLink" onClick={handleClick}>Sign out</span>
      </div>
    </div>
  );
}