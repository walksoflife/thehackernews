import moment from "moment";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { BsThreeDotsVertical, BsFillReplyFill } from "react-icons/bs";
import { useContext, useState } from "react";
import CreateComment from "./createComment/CreateComment";
import { AuthContext } from "../../context/AuthContext";
import { getReplyComments } from "../../services";
import { scroll } from "../../utils/scroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../services/makeRequest";
import Loading from "../Loading";

const Comment = ({ comment, data }) => {
  const { currentUser } = useContext(AuthContext);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplyCm, setShowReplyCm] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [isEditCm, setIsEditCm] = useState(false);

  const [loadingCm, setLoadingCm] = useState(false);

  // get comment which has parentId = current comment id
  let replyComments = getReplyComments(data, comment.commentId);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      setLoadingCm(true);
      await makeRequest
        .delete(`/comments/${comment.commentId}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((res) => {
          setOpenOptions(false);
          setLoadingCm(false);
        })
        .catch((err) => {
          setOpenOptions(false);
          setLoadingCm(false);
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", comment.post]);
      },
    }
  );

  const handleOpenEditCm = () => {
    setIsEditCm(true);
    setOpenOptions(false);
  };

  const handleCloseEditCm = () => {
    setIsEditCm(false);
    setOpenOptions(false);
  };

  const handleRemoveCm = () => {
    mutation.mutate();
  };

  if (loadingCm) return <Loading />;

  return (
    <div className="comment">
      <div className="commentImg">
        <Link to={`/u/${comment.author}`} className="link" onClick={scroll}>
          <img src={comment.avatar} alt="" />
        </Link>
      </div>
      <div className="commentInfo">
        <div className="namecontent">
          <div className="nameContent-container">
            <div className="name">
              <Link
                to={`/u/${comment.author}`}
                className="link"
                onClick={scroll}
              >
                <b>{comment.username}</b>
              </Link>
              <span>{moment(comment.commentCreatedAt).format("MMM D")}</span>
            </div>

            <p>{comment.content}</p>
          </div>
          <div className="comment-actions">
            <div className="comment-actions-icon">
              <AiFillLike className="comment-cm-icon" />
              <BsFillReplyFill
                className="comment-cm-icon"
                onClick={() => setIsReplying(true)}
              />
              {currentUser.id === comment.author && (
                <div
                  className="comment-cm-options"
                  onClick={() => setOpenOptions(true)}
                >
                  <BsThreeDotsVertical className="comment-cm-icon" />
                  {openOptions && (
                    <ul className="comment-cm-select">
                      <li
                        className="comment-cm-select-item"
                        onClick={handleOpenEditCm}
                      >
                        Edit
                      </li>
                      <li
                        className="comment-cm-select-item"
                        onClick={handleRemoveCm}
                      >
                        Delete
                      </li>
                      <li
                        className="comment-cm-select-item"
                        onClick={handleCloseEditCm}
                      >
                        Cancel
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            {replyComments?.length > 0 && (
              <p
                onClick={() => setShowReplyCm(!showReplyCm)}
                className="comment-viewall"
              >
                {showReplyCm ? "Hide" : "View"} all {replyComments?.length}{" "}
                replies
              </p>
            )}
          </div>
        </div>
        {isReplying && (
          <CreateComment
            typeBtn="Reply"
            parentPost={comment.post}
            author={currentUser.id}
            parentId={comment.commentId}
            setIsReplying={setIsReplying}
            setShowReplyCm={setShowReplyCm}
          />
        )}
        {isEditCm && (
          <CreateComment
            typeBtn="Save"
            handleCloseEditCm={handleCloseEditCm}
            comment={comment}
            parentPost={comment.post}
            author={currentUser.id}
            parentId={comment.commentId}
            setIsReplying={setIsReplying}
            setShowReplyCm={setShowReplyCm}
          />
        )}
        {replyComments?.length > 0 &&
          replyComments.map((c) => {
            if (showReplyCm) {
              return <Comment comment={c} key={c.commentId} data={data} />;
            }
          })}
      </div>
    </div>
  );
};

export default Comment;
