import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, onLike }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => {
    // show the blog url, likes and user who posted
    setVisible(!visible);
  };
  
  const handleLike = async () => {
    await onLike(blog.likes, blog.id);
  }
  return (
    <div>
      {blog.title} {blog.author}{" "}
      {!visible && <button onClick={toggleVisiblity}>view</button>}
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <button onClick={handleLike}>like</button>
          <p>{blog.user.username}</p>
          <button onClick={toggleVisiblity}>cancel</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Blog;