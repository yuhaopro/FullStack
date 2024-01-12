import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, putOne } from "./services/requests";
import VoteButton from "./components/VoteButton";

const App = () => {
  const anecdotesQuery = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(anecdotesQuery)));

  if (anecdotesQuery.isLoading) {
    return <div>Loading Data...</div>;
  }

  if (anecdotesQuery.isError) {
    return <div>{anecdotesQuery.error.message}</div>;
  }

  const anecdotes = anecdotesQuery.data;
  console.log(anecdotes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm type="CREATE" />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <VoteButton anecdote={anecdote} type="VOTE"></VoteButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
