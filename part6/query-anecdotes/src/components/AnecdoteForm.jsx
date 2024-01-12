import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOne } from "../services/requests";
import { useNotificationDispatch } from "../reducers/notificationReducer";

const AnecdoteForm = ({ type }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: createOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      console.log("Error Message", error);
      notificationDispatch({ type: "ERROR" });
      setTimeout(() => {
        notificationDispatch({ type: "RESET" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, votes: 0 });

    // change notification state;
    notificationDispatch({ type, payload: content });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
