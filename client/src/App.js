import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext, useRef, lazy, Suspense } from "react";
import { AuthContext } from "./context/AuthContext";
import "./styles/index.scss";
import NavBar from "./components/NavBar";
import Sub from "./components/Sub";
import Navigation from "./components/nav/Navigation";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import PostSearch from "./pages/PostSearch";
import PostSaved from "./pages/PostSaved";
import PostDetails from "./pages/PostDetails";
import ContactUs from "./pages/ContactUs";
import Webinar from "./pages/Webinar";
import Register from "./pages/Register";
import Login from "./pages/Login";

// const Home = lazy(() => import("./pages/Home"));
// const Login = lazy(() => import("./pages/Login"));
// const Register = lazy(() => import("./pages/Register"));
// const Profile = lazy(() => import("./pages/Profile"));
// const PostDetails = lazy(() => import("./pages/PostDetails"));
// const ContactUs = lazy(() => import("./pages/ContactUs"));
// const PostPage = lazy(() => import("./pages/PostPage"));
// const PostSearch = lazy(() => import("./pages/PostSearch"));
// const PostSaved = lazy(() => import("./pages/PostSaved"));
// const Webinar = lazy(() => import("./pages/Webinar"));

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const emailBoxRef = useRef();

  const PrivateRoute = () => {
    return currentUser?.token ? <Outlet /> : <Navigate to="/login" />;
  };

  const scrollToEmailBox = () => {
    window.scrollTo({
      behavior: "smooth",
      top: emailBoxRef.current?.offsetTop,
    });
  };

  return (
    <BrowserRouter>
      {currentUser?.token && (
        <>
          <Sub />
          <NavBar scrollToEmailBox={scrollToEmailBox} />
          <Navigation />
        </>
      )}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home emailBoxRef={emailBoxRef} />} />
          <Route path="/p" element={<PostPage emailBoxRef={emailBoxRef} />} />
          <Route path="/u/:userId" element={<Profile />} />
          <Route path="/p/search" element={<PostSearch />} />
          <Route path="/p/saved" element={<PostSaved />} />
          <Route
            path="/p/:postId"
            element={<PostDetails emailBoxRef={emailBoxRef} />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/webinar" element={<Webinar />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
