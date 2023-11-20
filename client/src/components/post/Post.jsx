import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {
  const [openComment, setOpenComment] = useState(false);

  const liked = false;
  // const liked = true;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="img" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 Min Ago</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <hr />
        <div className="content">
          <p>{post.description}</p>
          {post.img && <img src={post.img} alt="img" />}
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteBorderIcon /> : <FavoriteBorderOutlinedIcon />}12
            Likes
          </div>
          <div className="item" onClick={() => setOpenComment(!openComment)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon /> Share
          </div>
        </div>
        {openComment && <Comments />}
      </div>
    </div>
  );
};

export default Post;
