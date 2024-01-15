import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { notifyFor } from "../reducers/notificationReducer";
const CreateForm = () => {
  const dispatch = useDispatch();
  // useState here since only belonging to this component
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onError: (error) => {
      dispatch(notifyFor(`${error}`));
    },
    onSuccess: () => {
      setTitle("");
      setAuthor("");
      setUrl("");
      // trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      
    },
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    newBlogMutation.mutate({ title, author, url });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="title..."
        ></input>
      </div>
      <div>
        <label>Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={handleAuthorChange}
          placeholder="author..."
        ></input>
      </div>
      <div>
        <label>Url:</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="url..."
        ></input>
      </div>
      <button id="create-blog-submit" type="submit">
        Create
      </button>
    </form>
  );
};

export default CreateForm;
