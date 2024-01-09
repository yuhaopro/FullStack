import { useSelector, useDispatch } from "react-redux";
import {
  createAnecdote,
  likeAnecdote,
  sortAnecdote,
} from "./reducers/anecdoteReducer";
const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.create.value;

    event.target.create.value = "";
    dispatch(createAnecdote(content));
    dispatch(sortAnecdote());
  };

  const handleVote = (id) => {
    vote(id);
    dispatch(likeAnecdote(id));
    dispatch(sortAnecdote());
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;
