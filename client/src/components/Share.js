import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const Share = ({ postId }) => {
  const shareUrl = `${process.env.REACT_APP_API}/${postId}`;

  return (
    <ul className="share">
      <p>SHARE</p>
      <li className="shareItem" style={{ background: "#1da1f2" }}>
        <TwitterShareButton url={shareUrl}>
          <AiOutlineTwitter className="icon" />
        </TwitterShareButton>
      </li>
      <li className="shareItem" style={{ background: "#4267b2" }}>
        <FacebookShareButton url={shareUrl}>
          <ImFacebook className="icon" />
        </FacebookShareButton>
      </li>
      <li className="shareItem" style={{ background: "#007bb6" }}>
        <LinkedinShareButton url={shareUrl}>
          <FaLinkedinIn className="icon" />
        </LinkedinShareButton>
      </li>
      <li
        className="shareItem"
        style={{
          background:
            "linear-gradient(45deg,#f09433 0,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
        }}
      >
        <AiOutlineInstagram className="icon" />
      </li>
    </ul>
  );
};

export default Share;
