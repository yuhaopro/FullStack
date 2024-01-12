import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, putOne } from "./services/requests";

const App = () => {
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: putOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

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
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
