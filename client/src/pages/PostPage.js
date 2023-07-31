import { useQuery } from "@tanstack/react-query";
import Posts from "../components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";
import EmailBox from "../components/EmailBox";
import Footer from "../components/footers/Footer";
import Sidebar from "../components/Sidebar";
import BreakingNews from "../components/postsAll/BreakingNews";

const PostPage = ({ emailBoxRef }) => {
  const { cat, page, currentUser } = useContext(AuthContext);
  const { isLoading, data, error } = useQuery(
    ["posts", page, cat],
    async () => {
      if (cat) {
        return await makeRequest
          .get(`/posts?page=${page}&cat=${cat}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          })
          .then((res) => res.data.posts);
      } else {
        return await makeRequest
          .get(`/posts?page=${page}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          })
          .then((res) => res.data.posts);
      }
    }
  );

  return (
    <div className="home">
      <div className="home-container">
        <Posts isLoading={isLoading} error={error} posts={data} />
        <Sidebar />
      </div>
      <BreakingNews />
      <EmailBox emailBoxRef={emailBoxRef} />
      <Footer />
    </div>
  );
};

export default PostPage;
