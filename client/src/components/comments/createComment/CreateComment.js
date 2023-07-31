import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import makeRequest from "../../../services/makeRequest";
import { AuthContext } from "../../../context/AuthContext";
import Loading from "../../Loading";

const CreateComment = ({
  parentPost,
  handleCloseEditCm,
  comment,
  typeBtn,
  parentId = null,
  setIsReplying,
  setShowReplyCm,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("" || comment?.content);
  const queryClient = useQueryClient();

  const [loadingCm, setLoadingCm] = useState(false);

  const mutation = useMutation(
    async (cm) => {
      setLoadingCm(true);
      if (typeBtn === "Save") {
        await makeRequest
          .patch(`/comments/${comment?.commentId}`, cm, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          })
          .then((res) => {
            setLoadingCm(false);
            handleCloseEditCm();
          })
          .catch((err) => {});
      } else {
        await makeRequest
          .post("/comments", cm, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          })
          .then((res) => {
            setLoadingCm(false);
          })
          .catch((err) => setLoadingCm(false));
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", parentPost]);
        queryClient.invalidateQueries(["comments", parentPost]);
      },
    }
  );

  const handleComment = (e) => {
    e.preventDefault();

    if (typeBtn === "Save") {
      mutation.mutate({ content });
    }
    mutation.mutate({ content, post: parentPost, comment_parent: parentId });
    setContent("");
    if (typeBtn === "Reply") {
      setIsReplying(false);
      setShowReplyCm(true);
    }
  };

  if (loadingCm) return <Loading />;

  return (
    <form className="form-create-cm">
      <textarea
        name="comment"
        id="comment"
        placeholder={
          typeBtn === "Reply"
            ? "Add your reply"
            : typeBtn === "Save"
            ? "Editing comment"
            : "What are your thought?"
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-create-cm-input"
      />
      <div className="form-create-cm-btns">
        {typeBtn === "Reply" && (
          <button
            type="button"
            onClick={() => setIsReplying(false)}
            className="form-create-btn-cancel"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          onClick={handleComment}
          className="form-create-btn-submit"
        >
          {typeBtn}
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
