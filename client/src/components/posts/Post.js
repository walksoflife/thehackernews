import PostAuthor from "./PostAuthor";
import PostImg from "./PostImg";

const Post = ({ post }) => {
  const {
    image,
    title,
    category,
    created_at,
    description,
    authorId,
    username,
  } = post;

  return (
    <div className="post">
      <div className="postContainer">
        <PostImg image={image} created_at={created_at} />

        <div className="postRight">
          <h1 className="postRight-title">{title}</h1>
          <PostAuthor
            category={category}
            username={username}
            userId={authorId}
          />
          <p
            className="postDesc"
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ fontSize: "12px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
