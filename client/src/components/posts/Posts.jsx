import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return makeRequest.get("posts").then((res) => res.data);
    },
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isPending
        ? "Loading..."
        : data?.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
