import { useState, useEffect } from "react";
import blogService from "../services/blogs";
const useBlogs = (user, setMessage) => {
  const [blogs, setBlogs] = useState([]);
  // at start get all blog objects
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user, blogs]);

  const handleCreate = async (title, author, url) => {
    // input blank check
    if (title === "" || author === "" || url === "") {
      setMessage("Make sure all fields are filled");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }
    try {
      // blogs service api call
      const blogObject = {
        title: title,
        author: author,
        url: url,
      };
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(JSON.stringify(createdBlog)));
      setMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added!`
      );
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return { blogs, handleCreate };
};

export default useBlogs;
