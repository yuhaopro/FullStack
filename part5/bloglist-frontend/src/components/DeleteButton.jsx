import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogs from "../services/blogs";
import { useDispatch } from "react-redux";
import { notifyFor } from "../reducers/notificationReducer";
import { useNavigate } from "react-router";

const DeleteButton = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const removeBlogMutation = useMutation({
    mutationFn: blogs.deleteBlog,
    onSuccess: () => {
      // re-render the blogs
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleRemove = () => {
    // mutate using react query
    removeBlogMutation.mutate(blog.id);
    dispatch(notifyFor(`Deleted "${blog.title} by ${blog.author}"`));
    navigate("/blogs");
  };
  return (
    <button className="delete-button" onClick={handleRemove}>
      delete
    </button>
  );
};

export default DeleteButton;
