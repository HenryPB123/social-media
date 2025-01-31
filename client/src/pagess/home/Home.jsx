import Posts from "../../components/posts/Posts";
import Share from "../../components/shares/Share";
import Stories from "../../components/storiess/Stories";
import "./home.scss";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: async () => {
  //     const res = await makeRequest.get("/posts");
  //     return res.data;
  //   },
  // });
  // console.log("dddddddddd", data);

  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
