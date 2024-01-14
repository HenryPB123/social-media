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

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/2004393/pexels-photo-2004393.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="img"
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/1612846/pexels-photo-1612846.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="img"
          className="profilePic"
        />
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
            <span>Name Pet</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>Social-Pet</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <MailOutlineIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <Posts />
    </div>
  );
};

export default Profile;
