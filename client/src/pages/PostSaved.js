import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Post from "../components/posts/Post";
import Title from "../components/Title";
import Footer from "../components/footers/Footer";

const PostSaved = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, data, error } = useQuery(
    ["bookmarks"],
    async () =>
      await makeRequest
        .get(`/posts/bookmark`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        })
        .then((res) => res.data.posts)
  );

  return (
    <div className="ps">
      <div
        className="psContainer"
        style={{ maxWidth: "1110px", margin: "0 185px", minHeight: "140px" }}
      >
        <Title title="Posts saved" />
        <div className="psList" style={{ marginBottom: "100px" }}>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <p>Somethings went wrong...</p>
          ) : data?.length < 1 ? (
            <p>You don't have post saved.</p>
          ) : (
            data?.map((post) => (
              <Link className="link" to={`/p/${post.postId}`} key={post.postId}>
                <Post post={post} />
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostSaved;
