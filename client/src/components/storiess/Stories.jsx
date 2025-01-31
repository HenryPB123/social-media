import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";

const Stories = () => {
  //temporary
  const stories = [
    {
      id: 1,
      name: "Any Name",
      img: "https://images.pexels.com/photos/2013665/pexels-photo-2013665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Any Name",
      img: "https://images.pexels.com/photos/2013665/pexels-photo-2013665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "Any Name",
      img: "https://images.pexels.com/photos/2013665/pexels-photo-2013665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      name: "Any Name",
      img: "https://images.pexels.com/photos/2013665/pexels-photo-2013665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  // const { currentUser } = useContext(AuthContext);
  const currentUser = {
    id: 1,
    name: "Any Name",
    userId: 1,
    profilePic:
      "https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=800",
  };

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="img" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="img" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
