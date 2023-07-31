import Title from "../components/Title";
import { useContext } from "react";
import makeRequest from "../services/makeRequest";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/posts/Post";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/footers/Footer";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { scroll } from "../utils/scroll";

const PostSearch = () => {
  const { searchValue, currentUser } = useContext(AuthContext);

  const { isLoading, data, error } = useQuery(["search", searchValue], () =>
    makeRequest
      .get(`/posts/search?keyword=${searchValue}`, {
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
        {searchValue !== "" && (
          <>
            <Title title={`Search for: ${searchValue}`} />
            <div className="psList" style={{ marginBottom: "100px" }}>
              {isLoading ? (
                <Loading />
              ) : error ? (
                <p>Somethings went wrong...</p>
              ) : data.length < 1 ? (
                <p>Not search results. Please try again</p>
              ) : (
                data.map((post) => (
                  <Link
                    key={post.postId}
                    className="link"
                    to={`/p/${post.postId}`}
                    onClick={scroll}
                  >
                    <Post post={post} />
                  </Link>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PostSearch;
