import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //Permite hacer peticiones más fácil que  UseEffect
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      return makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      });
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId: postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="img" />
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isPending
        ? "Loading..."
        : data?.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="img" />
              <div className="info">
                <span>
                  {comment.name.charAt(0).toUpperCase() + comment.name.slice(1)}
                </span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
