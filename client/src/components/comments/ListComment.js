import Comment from "./Comment";
import { getRootComments } from "../../services";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../services/makeRequest";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ListComment = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [page, setPage] = useState(0);

  const { isLoading, data, error } = useQuery(
    ["comments", postId],
    async () =>
      await makeRequest
        .get(`/comments/${postId}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
        .then((res) => res.data.comments)
  );

  let rootComments = getRootComments(data);

  // const cmRef = useRef();
  // useEffect(() => {
  //   cmRef.current && cmRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [data]);

  return (
    <div className="listComments" >
      {rootComments?.length > 0 &&
        rootComments.map((c) => (
          <Comment key={c.commentId} comment={c} data={data} />
        ))}
      {/* {data?.length > 0 && viewMore && (
        <p className="listComments-text" onClick={handleViewMore}>
          View more comments
        </p>
      )} */}
    </div>
  );
};

export default ListComment;
