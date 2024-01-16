import PropTypes from "prop-types";
import { useState } from "react";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const Blog = ({ blog }) => {
  console.log("====================================");
  console.log(blog);
  console.log("====================================");
  if (!blog) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} by {blog.author}
      </h2>

      <div>
        <p id="urlView">{blog.url}</p>
        <p id="likesView">likes {blog.likes}</p>
        <LikeButton blog={blog}></LikeButton>
        <p id="usernameView">Added by {blog.user.username}</p>
        <DeleteButton blog={blog}></DeleteButton>
      </div>
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
  }),
};

export default Blog;
