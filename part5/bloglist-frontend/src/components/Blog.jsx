import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, onLike, onRemove }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => {
    // show the blog url, likes and user who posted
    setVisible(!visible);
  };

  const handleLike = async () => {
    await onLike(blog.likes, blog.id);
  };

  const handleRemove = async () => {
    await onRemove(blog.id);
  };
  return (
    <div className="blog">
      {blog.title} {blog.author}{" "}
      {!visible && <button id="viewButton" onClick={toggleVisiblity}>view</button>}
      {visible && (
        <div>
          <p id="urlView">{blog.url}</p>
          <p id="likesView">likes {blog.likes}</p>
          <button id="likesButton" onClick={handleLike}>like</button>
          <p id="usernameView">{blog.user.username}</p>
          <button id="removeButton" onClick={handleRemove}>remove</button>
          <button id="collapseButton" onClick={toggleVisiblity}>collapse</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Blog;
