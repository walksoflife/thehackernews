import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";
import Loading from "../components/Loading";

const EditProfile = ({ data, setOpenEdit }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(data?.avatar || null);
  const [username, setUsername] = useState(data?.username || "");
  const [quote, setQuote] = useState(data?.quote || "");
  const [bio, setBio] = useState(data?.bio || "");
  const [location, setLocation] = useState(data?.location || "");

  const [loadingEdit, setLoadingEdit] = useState(false);

  const mutation = useMutation(
    async (user) => {
      setLoadingEdit(true);
      return await makeRequest
        .patch(`/users/${data?.userId}`, user, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((res) => {
          setLoadingEdit(false);
          setOpenEdit(false);
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users", data?.userId]);
      },
    }
  );

  const handleEditProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("quote", quote);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("avatar", avatar);

    mutation.mutate(formData);
  };

  if (loadingEdit) return <Loading />;

  return (
    <form className="edit-form">
      <label htmlFor="name" className="edit-label">
        Username
      </label>
      <input
        type="text"
        name="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="edit-input"
      />
      <label htmlFor="location" className="edit-label">
        Location
      </label>
      <input
        type="text"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="edit-input"
      />
      <label htmlFor="quote" className="edit-label">
        Quote
      </label>
      <input
        type="text"
        name="quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        className="edit-input"
      />
      <label htmlFor="bio" className="edit-label">
        Biography
      </label>
      <textarea
        type="text"
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="edit-textarea"
      />
      <div className="edit-group">
        <label className="edit-label">Photo</label>
        <img
          src={avatar.name ? URL.createObjectURL(avatar) : avatar}
          alt=""
          className="edit-avatar"
        />
        <label htmlFor="edit-gr-input" className="edit-upload-img">
          Change of upload a new photo
        </label>
        <input
          type="file"
          id="edit-gr-input"
          className="edit-group-input"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </div>
      <button
        onClick={handleEditProfile}
        type="button"
        className="edit-btn-submit"
      >
        Save
      </button>
    </form>
  );
};

export default EditProfile;
