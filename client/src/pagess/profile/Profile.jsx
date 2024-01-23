import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //Permite hacer peticiones más fácil que  UseEffect
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      });
    },
  });

  const handleFollow = () => {
    //TO DO
  };

  return (
    <div className="profile">
      {isPending ? (
        "Loading..."
      ) : (
        <>
          <div className="images">
            <img src={data?.coverPic} alt="img" className="cover" />
            <img src={data?.profilePic} alt="img" className="profilePic" />
          </div>

          <div className="profileContainer">
            <div className="userInfo">
              <div className="left">
                <a href="">
                  <FacebookTwoToneIcon className="large" />
                </a>
                <a href="">
                  <LinkedInIcon className="large" />
                </a>
                <a href="">
                  <InstagramIcon className="large" />
                </a>
                <a href="">
                  <PinterestIcon className="large" />
                </a>
                <a href="">
                  <TwitterIcon className="large" />
                </a>
              </div>
              <div className="center">
                <span>
                  {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}
                </span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data?.website}</span>
                  </div>
                </div>
                {userId === currentUser.id ? (
                  <button>Update</button>
                ) : (
                  <button onClick={handleFollow}>Follow</button>
                )}
              </div>
              <div className="right">
                <MailOutlineIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
          <Posts userId={userId} />
        </>
      )}
    </div>
  );
};

export default Profile;
