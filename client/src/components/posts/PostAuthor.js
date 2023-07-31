import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TbCategory } from "react-icons/tb";

const PostAuthor = ({ category, username, userId }) => {
  return (
    <div className="postAuthor">
      <Link className="link" to={`/u/${userId}`}>
        <p>
          <BsPersonFill /> <span>{username}</span>
        </p>
      </Link>
      <p>
        <TbCategory />
        <span>{category}</span>
      </p>
    </div>
  );
};

export default PostAuthor;
