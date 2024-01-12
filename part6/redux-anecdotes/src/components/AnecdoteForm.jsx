import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
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
    dispatch(createAnecdotes(content));
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
