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
  const [openMenu, setOpenMenu] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: async () => {
      const res = await makeRequest.get("/likes?postId=" + post.id);
      return res.data;
    },
  });

  const { data: commentsData } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: async () => {
      const res = await makeRequest.get("/comments?postId=" + post.id);
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      console.log("aaaa", postId);
      console.log("bbbbbb", post.id);

      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={
                currentUser?.profilePicture && "/upload/" + post.profilePicture
              }
              alt="img"
              onError={(e) => {
                e.target.src = post.profilePicture;
              }}
            />
            <div className="details">
              <Link
                to={`profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">
                  {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
                </span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {post.userId === currentUser.id && (
            <>
              <MoreHorizOutlinedIcon onClick={() => setOpenMenu(!openMenu)} />
              {openMenu && post.userId === currentUser.id && (
                <button onClick={handleDelete}>Delete</button>
              )}
            </>
          )}
        </div>
        <hr />
        <div className="content">
          <p>{post.description}</p>
          {post.img && <img src={"../../../upload/" + post.img} alt="img" />}
        </div>
        <div className="info">
          <div className="item">
            {isPending ? (
              "Loading..."
            ) : data && data.includes(currentUser.id) ? (
              <FavoriteBorderIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data && data.length} Likes
          </div>
          <div className="item" onClick={() => setOpenComment(!openComment)}>
            <TextsmsOutlinedIcon />
            {commentsData && commentsData.length} Comments
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
