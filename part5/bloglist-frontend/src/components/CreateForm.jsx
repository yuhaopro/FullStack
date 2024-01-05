import { useState } from "react";

// create createForm React Component
const CreateForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
    
    // validate input here
    await onCreate(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
        ></input>
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
        ></input>
      </div>
      <div>
        <label>Url:</label>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
        ></input>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateForm;
