import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";

const Posts = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const url = userId ? `/posts?userId=${userId}` : "/posts";
      const res = await makeRequest.get(url);
      return res.data;
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
