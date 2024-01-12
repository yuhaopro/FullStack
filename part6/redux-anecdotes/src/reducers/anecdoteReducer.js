import { createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    voteAnecdote(state, action) {
      return state.map((item) =>
        item.id === action.payload ? { ...item, votes: item.votes + 1 } : item
      );
    },
    sortAnecdote(state, action) {
      return [...state].sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, sortAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await api.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdotes = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await api.createNew(anecdote);
    dispatch(appendAnecdote(newAnecdote));
    dispatch(sortAnecdote());
  };
};

export const handleVoteAnecdote = (id) => {
  return async (dispatch) => {
    // get the anecdote based on id;
    const anecdote = await api.getOne(id);
    const object = { ...anecdote, votes: anecdote.votes + 1 };
    await api.updateOne(id, object);
    dispatch(voteAnecdote(id));
    dispatch(sortAnecdote());
  };
};

export default anecdoteSlice.reducer;
