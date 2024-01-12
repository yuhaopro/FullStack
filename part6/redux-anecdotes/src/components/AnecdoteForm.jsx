import React from "react";
import { useDispatch } from "react-redux";
import {
  createAnecdote,
  likeAnecdote,
  sortAnecdote,
  setAnecdote,
} from "../reducers/anecdoteReducer";
import {
  notificationChange,
  notificationReset,
} from "../reducers/notificationReducer";

import api from "../../services/api";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.create.value;

    event.target.create.value = "";
    const newAnecdote = await api.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(sortAnecdote());
    dispatch(notificationChange(content));
    setTimeout(() => {
      dispatch(notificationReset());
    }, 5000);
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
