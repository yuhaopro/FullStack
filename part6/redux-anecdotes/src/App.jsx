import { useDispatch } from "react-redux";
import AnecdoteFilter from "./components/AnecdoteFilter";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useEffect } from "react";
import api from "../services/api";
import { setAnecdote } from "./reducers/anecdoteReducer";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    api.getAll().then((res) => dispatch(setAnecdote(res)));
  }, []);
  return (
    <div>
      <Notification></Notification>
      <h2>Anecdotes</h2>
      <AnecdoteFilter></AnecdoteFilter>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
