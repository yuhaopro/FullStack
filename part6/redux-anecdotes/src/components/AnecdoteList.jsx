import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleVoteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
  };

  const handleVote = (id) => {
    vote(id);
    dispatch(handleVoteAnecdote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AnecdoteList;
