import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PostAuthor from "../components/posts/PostAuthor";
import Title from "../components/Title";
import CreateComment from "../components/comments/createComment/CreateComment";
import ListComment from "../components/comments/ListComment";
import Trending from "../components/postsAll/Trending";
import BreakingNews from "../components/postsAll/BreakingNews";
import Share from "../components/Share";
import { RiEditBoxLine, RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import BoxConfirm from "../components/BoxConfirm";
import PostImg from "../components/posts/PostImg";
import Loading from "../components/Loading";
import EmailBox from "../components/EmailBox";
import Footer from "../components/footers/Footer";
import ShareDetail from "../components/ShareDetail";
import EditPost from "../components/newPosts/EditPost";
import { handleOpenModal } from "../services";
import { io } from "socket.io-client";

const PostDetails = ({ emailBoxRef }) => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const { currentUser, loading, setLoading } = useContext(AuthContext);
  const { postId } = useParams();

  const { isLoading, data, error } = useQuery(["post", postId], () =>
    makeRequest
      .get(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })
      .then((res) => res.data.post)
      .catch((err) => console.log(err))
  );

  const {
    isLoading: loadingBookmark,
    data: dataBookmark,
    error: errorBookmark,
  } = useQuery(["bookmarks"], () =>
    makeRequest
      .get(`/posts/bookmark`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })
      .then((res) => res.data.posts)
      .catch((err) => console.log(err))
  );

  const mutationBookmark = useMutation(
    async (marked) => {
      setLoading(true);
      await makeRequest
        .put(`/posts/bookmark`, marked, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {});
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", postId]);
        queryClient.invalidateQueries(["bookmarks"]);
      },
    }
  );

  const handleBookmarkPost = () => {
    mutationBookmark.mutate({ post: postId });
  };

  const [isReplying, setIsReplying] = useState(false);
  const [commentParent, setCommentParent] = useState("");
  const [content, setContent] = useState("");

  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) socket.current = io("http://103.75.186.247:5000");
    socket.current && socket.current.emit("view-count", { postId });
  }, [postId]);

  if (loading) return <Loading />;

  return (
    <div className="postDetails">
      <div className="pdContainer">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>Something wents wrong...</p>
        ) : (
          <div className="pdItem">
            <p className="pdItem-title">{data.title}</p>
            <div className="pdSection">
              <div className="pdLeft">
                <div className="pdInfo">
                  <PostAuthor
                    category={data.category}
                    username={data.username}
                    userId={data.authorId}
                  />
                  <div className="pdActions">
                    {data.viewer > 0 && (
                      <div className="pdView">
                        <AiOutlineEye />
                        <span>{data.viewer}</span>
                      </div>
                    )}
                    {dataBookmark?.map((b) => b.postId).includes(postId) ? (
                      <BsBookmarkFill
                        style={{
                          cursor: "pointer",
                          color: "goldenrod",
                        }}
                        onClick={handleBookmarkPost}
                      />
                    ) : (
                      <BsBookmark
                        style={{ cursor: "pointer" }}
                        onClick={handleBookmarkPost}
                      />
                    )}
                    {currentUser.id === data.authorId && (
                      <>
                        <RiEditBoxLine
                          className="pdIcon"
                          style={{ color: "teal" }}
                          onClick={() => handleOpenModal(setOpenEditPost)}
                        />
                        <RiDeleteBinLine
                          className="pdIcon"
                          onClick={() => {
                            handleOpenModal(setOpenDialog);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
                <PostImg image={data.image} dateCreated={data.created_at} />
                <div
                  className="pdDesc"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
                <div className="pdShare">
                  <ShareDetail postId={postId} />
                </div>
                <Title title="Comments" />
                <CreateComment
                  typeBtn="Submit"
                  parentPost={postId}
                  author={currentUser.id}
                  isReplying={isReplying}
                  setIsReplying={setIsReplying}
                  commentParent={commentParent}
                  content={content}
                  setContent={setContent}
                />
                <ListComment
                  postId={postId}
                  isReplying={isReplying}
                  setIsReplying={setIsReplying}
                  setCommentParent={setCommentParent}
                  setContent={setContent}
                  content={content}
                />
              </div>
              <Trending />
            </div>
          </div>
        )}
        {openDialog && (
          <BoxConfirm
            setLoading={setLoading}
            postId={postId}
            currentUser={currentUser}
            setOpenDialog={setOpenDialog}
          />
        )}
        {openEditPost && (
          <EditPost data={data} setOpenEditPost={setOpenEditPost} type="edit" />
        )}
        <Share postId={postId} />
      </div>
      <BreakingNews />
      <EmailBox emailBoxRef={emailBoxRef} />
      <Footer />
    </div>
  );
};

export default PostDetails;
