import { useState, useEffect } from "react";
import blogService from "../services/blogs";
const useBlogs = (user, setMessage, closeTheForm) => {
  const [blogs, setBlogs] = useState([]);

  const sortBlogsAndUpdate = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };
  // at start get all blog objects
  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      sortBlogsAndUpdate(blogs);
    }
    fetchBlogs();
  }, [user]);

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
      //   console.log(createdBlog);
      sortBlogsAndUpdate(blogs.concat(createdBlog));

      setMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added!`
      );
      // close the create form
      closeTheForm();
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const handleLike = async (originalLikes, id) => {
    const updatedLikes = {
      likes: originalLikes + 1,
    };
    console.log(updatedLikes);
    try {
      const updatedBlog = await blogService.update(id, updatedLikes);
      console.log(updatedBlog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      sortBlogsAndUpdate(updatedBlogs);
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return { blogs, handleCreate, handleLike };
};

export default useBlogs;
