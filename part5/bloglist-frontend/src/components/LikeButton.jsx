import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { notifyFor } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const LikeButton = ({ blog }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleLike = () => {
    // mutate the like value
    likeBlogMutation.mutate({
      id: blog.id,
      newObject: { likes: blog.likes + 1 },
    });
    dispatch(notifyFor(`You like the blog "${blog.title}"`));
  };

  return (
    <button className="like-button" onClick={() => handleLike()}>
      like
    </button>
  );
};

export default LikeButton;
