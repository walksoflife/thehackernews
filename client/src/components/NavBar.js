import { useContext } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = ({ scrollToEmailBox }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="link" reloadDocument>
            <img
              src="https://res.cloudinary.com/dqzwavus9/image/upload/v1681658596/blog/hacker_crjjgw.png"
              alt=""
              className="navbar-img"
            />
          </Link>
        </div>

        {currentUser.id ? (
          <div className="navbar-subcribe" onClick={scrollToEmailBox}>
            <MdEmail />
            <p>Subscribe to Newletter</p>
          </div>
        ) : (
          <Link to="/login" className="link">
            <button className="navbar-signin">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
