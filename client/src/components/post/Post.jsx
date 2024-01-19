import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [openComment, setOpenComment] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const getInfo = async (postId) => {
    const comments = await makeRequest.get("/comments?postId=" + postId);

    const likes = await makeRequest.get("/likes?postId=" + postId);

    return {
      comments: comments.data,
      likes: likes.data,
    };
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => getInfo(post.id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const handleLike = () => {
    mutation.mutate(data?.likes.includes(currentUser.id));
  };

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
                <span className="name">
                  {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
                </span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <hr />
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={"../../../upload/" + post.img} alt="img" />}
        </div>
        <div className="info">
          <div className="item">
            {isPending ? (
              "Loading..."
            ) : data?.likes.includes(currentUser.id) ? (
              <FavoriteBorderIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data && data.likes.length} Likes
          </div>
          <div className="item" onClick={() => setOpenComment(!openComment)}>
            <TextsmsOutlinedIcon />
            {data?.comments && data.comments.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon /> Share
          </div>
        </div>
        {openComment && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
