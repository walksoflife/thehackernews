import { useContext } from "react";
import Posts from "../components/posts/Posts";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";
import BreakingNews from "../components/postsAll/BreakingNews";
import EmailBox from "../components/EmailBox";
import Footer from "../components/footers/Footer";

const Home = ({ emailBoxRef }) => {
  const { page, currentUser } = useContext(AuthContext);

  const { isLoading, data, error } = useQuery(["posts", page], () =>
    makeRequest
      .get(`/posts?page=${page}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })
      .then((res) => res.data.posts)
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

export default Home;
