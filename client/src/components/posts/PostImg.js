import moment from "moment";
import LazyImage from "./LazyImage";

const PostImg = ({ image, created_at }) => {
  return (
    <div className="postLeft">
      <LazyImage src={image} />
      <div className="postDate">
        <p>{moment(created_at).format("MMM D")}</p>
        <p>{moment(created_at).format("YYYY")}</p>
      </div>
    </div>
  );
};

export default PostImg;
