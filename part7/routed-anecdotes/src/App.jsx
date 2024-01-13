import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";
import CreateNew from "./screens/Create";
import About from "./screens/About";
import AnecdoteList from "./components/AnecdoteList";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";

const App = () => {
  const padding = {
    paddingRight: 5,
  };

  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification(`a new anecdote '${anecdote.content} has been created!`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>

      <div>
        <Link to="/" style={padding}>
          anecdotes
        </Link>
        <Link to="/create" style={padding}>
          create new
        </Link>
        <Link to="/about" style={padding}>
          about
        </Link>
      </div>
      {notification && <div>{notification}</div>}
      <Routes>
        <Route
          path={"/"}
          element={<AnecdoteList anecdotes={anecdotes} />}
        ></Route>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote}></Anecdote>}
        ></Route>
        <Route path="/create" element={<CreateNew addNew={addNew} />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
