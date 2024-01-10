import AnecdoteFilter from "./components/AnecdoteFilter";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification"
const App = () => {
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
