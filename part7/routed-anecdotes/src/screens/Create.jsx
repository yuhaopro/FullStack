import { useState } from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  // destructure so i can still use spread syntax for input tag
  const { onReset: onResetContent, ...contentInput } = content;
  const { onReset: onResetAuthor, ...authorInput } = author;
  const { onReset: onResetInfo, ...infoInput } = info;

  const handleReset = () => {
    onResetContent();
    onResetAuthor();
    onResetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentInput} />
        </div>
        <div>
          author
          <input name="author" {...authorInput} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoInput} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset} type="button">reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
