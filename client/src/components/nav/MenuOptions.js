import {
  MdOutlineLogout,
  MdOutlineAccountCircle,
  MdOutlineSettings,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { BsBookmarkHeart } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading";
import { handleOpenModal } from "../../services";

const MenuOptions = ({
  showMenuOptions,
  setMenuOptions,
  setOpenCreatePost,
}) => {
  const { currentUser, loading, setLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className={showMenuOptions ? "menuOptions active" : "menuOptions"}>
      <ul className="menuList" onClick={() => setMenuOptions(false)}>
        <Link to={`/u/${currentUser.id}`} className="link">
          <li className="menuItem">
            <MdOutlineAccountCircle className="icon" />
            <span style={{ fontWeight: "600", color: "#3732b3" }}>
              {currentUser.username}
            </span>
          </li>
        </Link>
        {/* <Link to="/p/new" className="link"> */}
        <li
          className="menuItem"
          onClick={() => handleOpenModal(setOpenCreatePost)}
        >
          <MdOutlineCreateNewFolder className="icon" />
          <span>Create Post</span>
        </li>
        {/* </Link> */}
        <Link className="link" to={`/p/saved`}>
          <li className="menuItem">
            <BsBookmarkHeart className="icon" />
            <span>Saved Post</span>
          </li>
        </Link>
        <li className="menuItem">
          <MdOutlineSettings className="icon" />
          <span>Settings</span>
        </li>
        <li className="menuItem" onClick={handleLogout}>
          <MdOutlineLogout className="icon" />
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuOptions;
