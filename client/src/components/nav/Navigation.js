import { useState } from "react";
import { GrSearch, GrMenu } from "react-icons/gr";
import Categories from "./Categories";
import MenuOptions from "./MenuOptions";
import Search from "./Search";
import EditPost from "../newPosts/EditPost";

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenuOptions, setMenuOptions] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const handleOpenSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="navigation">
      <div className="navigation-container">
        <div className="navigation-top">
          <Categories />
          <div className="navigation-right">
            <div className="navigation-item">
              <GrSearch className="icon" onClick={handleOpenSearch} />
            </div>
            <div className="navigation-item showMenuOptions">
              <GrMenu
                className="icon"
                onClick={() => setMenuOptions(!showMenuOptions)}
              />
              <MenuOptions
                setMenuOptions={setMenuOptions}
                showMenuOptions={showMenuOptions}
                setOpenCreatePost={setOpenCreatePost}
              />
            </div>
          </div>
        </div>
        <div
          className={
            showSearch ? "navigation-bottom active" : "navigation-bottom"
          }
        >
          <Search setShowSearch={setShowSearch} />
        </div>
      </div>
      {openCreatePost && (
        <EditPost setOpenEditPost={setOpenCreatePost} type="create" />
      )}
    </div>
  );
};

export default Navigation;
