import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  //Temporary
  const posts = [
    {
      id: 1,
      name: "Pet Name",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      img: "https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      name: "Pet Name",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nemo iste mollitia temporibus ea autem consequuntur inventore. Accusamus porro, ipsam ad nisi laborum, quasi pariatur eum modi aspernatur odit sed.",
    },
    {
      id: 3,
      name: "Pet Name",
      userId: 3,
      profilePic:
        "https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      img: "https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
