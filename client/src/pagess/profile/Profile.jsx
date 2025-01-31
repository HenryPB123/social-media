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
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[3]);

  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await makeRequest.get("/users/find/" + userId);
      return res.data;
    },
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: async () => {
      const res = await makeRequest.get(
        "/relationships?followedUserId=" + userId
      );
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["realtionship"]);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isPending ? (
        "Loading..."
      ) : (
        <>
          <div className="images">
            <img
              src={
                data
                  ? `/upload/${data.coverPicture}`
                  : `/upload/${currentUser.coverPicture}`
              }
              alt="img"
              className="cover"
            />
            <img
              src={
                data
                  ? `/upload/${data.profilePicture}`
                  : `/upload/${currentUser.profilePicture}`
              }
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
                <span>
                  {data &&
                    data.name.charAt(0).toUpperCase() + data?.name.slice(1)}
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
                {rIsLoading ? (
                  "Loading..."
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData?.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
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
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
