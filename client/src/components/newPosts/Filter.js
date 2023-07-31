import { BsFileImage, BsFillFileTextFill } from "react-icons/bs";

const Filter = ({ openPost, openImgs, setOpenPost, setOpenImgs }) => {
  const handleFilter = (item) => {
    if (item === "Post") {
      setOpenPost(true);
      setOpenImgs(false);
    } else if (item === "Imgs") {
      setOpenImgs(true);
      setOpenPost(false);
    } else return;
  };

  return (
    <div className="newp-filter">
      <div
        className={openPost ? "newp-filter-item choose" : "newp-filter-item"}
        onClick={() => handleFilter("Post")}
      >
        <BsFillFileTextFill style={{ fontSize: "20px" }} />
        <span>Post</span>
      </div>
      <div
        className={openImgs ? "newp-filter-item choose" : "newp-filter-item"}
        onClick={() => handleFilter("Imgs")}
      >
        <BsFileImage style={{ fontSize: "20px" }} />
        <span>Image & Video</span>
      </div>
    </div>
  );
};

export default Filter;
