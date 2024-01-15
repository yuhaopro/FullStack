import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { notifyFor } from "../reducers/notificationReducer";

const useBlogs = (user, closeTheForm) => {
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const sortBlogsAndUpdate = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };
  // at start get all blog objects

  async function fetchBlogs() {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
    sortBlogsAndUpdate(blogs);
  }

  const handleCreate = async (title, author, url) => {
    // input blank check
    if (title === "" || author === "" || url === "") {
      // TODO: set notification all fields filled
      dispatch(notifyFor("Field are not filled"));
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
      await fetchBlogs();

      dispatch(
        notifyFor(
          `A new blog ${blogObject.title} by ${blogObject.author} added!`
        )
      );
      // close the create form
      closeTheForm();
    } catch (error) {
      dispatch(notifyFor(error));
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
      dispatch(notifyFor(error));
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await blogService.deleteBlog(id);
      console.log(response);
      if (response.error) {
        dispatch(notifyFor(response.error));
        return;
      } else {
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        console.log(updatedBlogs);
        sortBlogsAndUpdate(updatedBlogs);
      }
    } catch (error) {
      dispatch(notifyFor(error));
    }
  };

  return { blogs, handleCreate, handleLike, handleRemove, fetchBlogs };
};

export default useBlogs;
