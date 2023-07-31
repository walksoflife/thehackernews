import { useContext, useState } from "react";
import Title from "../Title";
import SelectCat from "./SelectCat";
import { AuthContext } from "../../context/AuthContext";
import Filter from "./Filter";
import TextEditor from "./TextEditor";
import ChooseImg from "./ChooseImg";
import { BsTrash } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../services/makeRequest";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../Loading";
import { handleCloseModal } from "../../services";

const EditPost = ({ type, data, setOpenEditPost }) => {
  const { currentUser, setLoading, loading, page, cat } =
    useContext(AuthContext);
  const [image, setImage] = useState("" || data?.image);
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [category, setCategory] = useState(data?.category || "Data Breaches");

  const [openPost, setOpenPost] = useState(true);
  const [openImgs, setOpenImgs] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (post) => {
      if (type === "edit") {
        setLoading(true);
        await makeRequest
          .patch(`/posts/${data.postId}`, post, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          })
          .then((res) => {
            setLoading(false);
            handleCloseModal(setOpenEditPost);
          })
          .catch((err) => {
            setLoading(false);
            handleCloseModal(setOpenEditPost);
          });
      }
      setLoading(true);
      await makeRequest
        .post(`/posts`, post, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((res) => {
          setLoading(false);
          handleCloseModal(setOpenEditPost);
        })
        .catch((err) => {
          setLoading(false);
          handleCloseModal(setOpenEditPost);
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["posts", page]);
        queryClient.invalidateQueries(["posts", page, cat]);
        queryClient.invalidateQueries(["post", data?.postId]);
        setLoading(false);
      },
    }
  );

  const handleEditPost = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image || data?.image);
    formData.append("category", category);

    mutation.mutate(formData);
  };

  if (loading) return <Loading />;

  return (
    <div className="edit-post">
      <div className="edit-post-container">
        <Title title={type === "edit" ? "Edit post" : "Create new post"} />
        <div className="edit-post-header">
          <SelectCat category={category} setCategory={setCategory} />
          <Filter
            openImgs={openImgs}
            openPost={openPost}
            setOpenImgs={setOpenImgs}
            setOpenPost={setOpenPost}
          />
        </div>
        {openPost && (
          <TextEditor
            description={description}
            setDescription={setDescription}
            setTitle={setTitle}
            title={title}
          />
        )}
        {openImgs && (
          <ChooseImg type={type} setImage={setImage} image={image} />
        )}
        <div className="newp-btn-tool">
          {image && (
            <BsTrash
              className="newp-remove-img"
              onClick={() => setImage(null)}
            />
          )}

          <button
            className="newp-btn-submit"
            type="button"
            onClick={handleEditPost}
          >
            {type === "edit" ? "Save" : "Publish"}
          </button>
        </div>
        <div
          className="edit-post-close"
          onClick={() => handleCloseModal(setOpenEditPost)}
        >
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
};

export default EditPost;
