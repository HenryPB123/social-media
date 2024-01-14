import Posts from "../../components/posts/Posts";
import Share from "../../components/shares/Share";
import Stories from "../../components/storiess/Stories";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
