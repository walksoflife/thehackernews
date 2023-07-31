import { AiOutlineTwitter, AiOutlineShareAlt } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const ShareDetail = ({ postId }) => {
  const shareUrl = `${process.env.REACT_APP_API}/${postId}`;

  return (
    <div className="shareDetail">
      <TwitterShareButton url={shareUrl}>
        <div className="shareDetail-item">
          <div className="shareDetail-left" style={{ background: "#1a91d9" }}>
            <AiOutlineTwitter className="icon" />
          </div>
          <div className="shareDetail-right" style={{ background: "#1da1f2" }}>
            <span>Tweet</span>
          </div>
        </div>
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl}>
        <div className="shareDetail-item">
          <div className="shareDetail-left" style={{ background: "#006ea3" }}>
            <FaLinkedinIn className="icon" />
          </div>
          <div className="shareDetail-right" style={{ background: "#007bb6" }}>
            <span>Share</span>
          </div>
        </div>
      </LinkedinShareButton>
      <FacebookShareButton url={shareUrl}>
        <div className="shareDetail-item">
          <div className="shareDetail-left" style={{ background: "#3949a3" }}>
            <ImFacebook className="icon" />
          </div>
          <div className="shareDetail-right" style={{ background: "#3f51b5" }}>
            <span>Share</span>
          </div>
        </div>
      </FacebookShareButton>
      <div className="shareDetail-item">
        <div
          className="shareDetail-left"
          style={{
            background: "#cb4c3d",
          }}
        >
          <AiOutlineShareAlt className="icon" />
        </div>
        <div className="shareDetail-right" style={{ background: "#e25544" }}>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default ShareDetail;
