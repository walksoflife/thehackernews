import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCloseModal } from "../services";
import makeRequest from "../services/makeRequest";
import { useNavigate } from "react-router-dom";

const BoxConfirm = ({ setOpenDialog, setLoading, postId, currentUser }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutationPost = useMutation(
    async () => {
      setLoading(true);
      await makeRequest
        .delete(`/posts/${postId}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((res) => {
          setLoading(false);
          handleCloseModal(setOpenDialog);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleRemovePost = () => {
    mutationPost.mutate();
  };

  return (
    <div className="boxConfirm">
      <div className="boxContainer">
        <p>Are you sure remove this post?</p>
        <div className="boxBtns">
          <button onClick={() => handleCloseModal(setOpenDialog)}>No</button>
          <button onClick={handleRemovePost}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default BoxConfirm;
