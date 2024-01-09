import React from "react";
import { useDispatch } from "react-redux";
import {
    createAnecdote,
    likeAnecdote,
    sortAnecdote,
  } from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.create.value;

    event.target.create.value = "";
    dispatch(createAnecdote(content));
    dispatch(sortAnecdote());
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="create" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
