import { useContext } from "react";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading";
import { scroll } from "../../utils/scroll";

const Posts = ({ isLoading, error, posts }) => {
  const navigate = useNavigate();
  const { page, setPage, cat } = useContext(AuthContext);

  const handleLink = (type, page) => {
    type === "next" ? setPage((page) => page + 1) : setPage((page) => page - 1);

    if (cat) {
      scroll();
      navigate(`/p?pagecurequal${page}&catcurequal${cat}`);
    } else {
      scroll();
      navigate(`/p?pagecurequal${page}`);
    }
  };

  return (
    <div className="posts">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Something went wrong...</p>
      ) : (
        posts?.map((post) => (
          <Link
            key={post.postId}
            to={`/p/${post.postId}`}
            className="link"
            onClick={scroll}
          >
            <Post post={post} />
          </Link>
        ))
      )}
      {page > 0 && (
        <button className="prevPage" onClick={() => handleLink("prev", page)}>
          Prev Page
        </button>
      )}
      {posts?.length >= 9 && (
        <button className="nextPage" onClick={() => handleLink("next", page)}>
          Next Page
        </button>
      )}
    </div>
  );
};

export default Posts;
