import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../reducers/notificationReducer";
import { putOne } from "../services/requests";

const VoteButton = ({ anecdote, type }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const updateAnecdoteMutation = useMutation({
    mutationFn: putOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    // handle notification
    notificationDispatch({ type, payload: anecdote.content });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, 5000);
  };
  return <button onClick={() => handleVote(anecdote)}>vote</button>;
};

export default VoteButton;
