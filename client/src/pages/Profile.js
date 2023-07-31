import { useContext, useState } from "react";
import makeRequest from "../services/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import EditProfile from "./EditProfile";
import Title from "../components/Title";
import Loading from "../components/Loading";
import {
  AiOutlineClose,
  AiOutlineLogin,
  AiFillAppstore,
  AiOutlineStar,
} from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { BsQuote } from "react-icons/bs";
import moment from "moment";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const { userId } = useParams();

  const { isLoading, data, error } = useQuery(["users", userId], () =>
    makeRequest
      .get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })
      .then((res) => res.data.user)
  );

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="profile">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Somethings went wrong...</p>
      ) : !openEdit ? (
        <div className="profile-container">
          <div className="profileBackground"></div>

          <div className="profileCenter">
            <div className="profileLeft">
              <div className="profileAvatar">
                <img src={data?.avatar} alt="" />
              </div>
              <div className="profileInfo">
                <h2>{data?.username}</h2>
                {data?.joinDate && (
                  <div className="profileInfo-item">
                    <AiOutlineLogin />
                    <p className="profileInfo-text">
                      {moment(data?.joinDate).format("MMMM D, YYYY")}
                    </p>
                  </div>
                )}
                <div className="profileInfo-item">
                  <AiFillAppstore />
                  <p className="profileInfo-text">{data?.posts} posts</p>
                </div>
                {data?.location && (
                  <div className="profileInfo-item">
                    <MdLocationPin />
                    <p className="profileInfo-text">{data?.location}</p>
                  </div>
                )}
                {data?.bio && (
                  <div className="profileInfo-item">
                    <BsQuote />
                    <p className="profileInfo-text">{data?.bio}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="profileRight">
              <div className="profileStar">
                <p className="numStar">0</p>
                <AiOutlineStar style={{ marginRight: "10px" }} />
                <span className="numStar-text">Star</span>
              </div>
              {userId == currentUser.id && (
                <button onClick={() => setOpenEdit(true)}>Edit Profile</button>
              )}
            </div>
          </div>

          <p className="profileQuote">{data?.quote && `“${data?.quote}”`}</p>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-close-edit">
            <AiOutlineClose onClick={() => setOpenEdit(false)} />
          </div>
          <Title title="Profile" />
          <div className="profile-edit">
            <p className="profile-title">Your Information</p>
            <EditProfile data={data} setOpenEdit={setOpenEdit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
