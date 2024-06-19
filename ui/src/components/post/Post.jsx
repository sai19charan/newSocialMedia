import "./post.css";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import {Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser]=useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);


  useEffect(()=>{
    const fetchUser =async()=>{
      const res=await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser();
  },[post.userId])

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture||"https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1"}
              alt=""
            />
             </Link>
            <span className="postUsername">
              {user.username}
            </span>
           
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
        <span className="postText">{post?.desc}</span>
        <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="https://static.vecteezy.com/system/resources/previews/000/422/370/original/like-icon-vector-illustration.jpg" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="https://static.vecteezy.com/system/resources/previews/000/422/370/original/like-icon-vector-illustration.jpg" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}