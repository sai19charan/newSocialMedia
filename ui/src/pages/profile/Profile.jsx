import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router"

export default function Profile() {
  const [user,setUser]=useState({})
  const username = useParams().username
  useEffect(()=>{
    const fetchUser =async()=>{
      const res=await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser();
  },[username])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture||"https://tse3.mm.bing.net/th?id=OIP.gpB7_qn-l-hIYeLufFtPWwAAAA&pid=Api&P=0&h=180"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture||"https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}