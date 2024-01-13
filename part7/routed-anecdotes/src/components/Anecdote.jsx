const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.author}</h3>
      <em>{anecdote.content}</em>
      <p>votes: {anecdote.votes}</p>
    </div>
  );
};

export default Anecdote;
