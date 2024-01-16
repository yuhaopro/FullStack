import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import useAuth from "./hooks/useAuth";
import Notification from "./components/Notification";
import { BlogList } from "./components/BlogList";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";

const App = () => {
  const { user, handleLogin, handleLogOut } = useAuth();
  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 5,
    refetchOnWindowFocus: false,
  });

  const blogs = blogsQuery.data;
  console.log("Blogs", blogs);

  const match = useMatch("/blogs/:id");
  const blog =
    match && blogs ? blogs.find((blog) => blog.id === match.params.id) : null;
  console.log("Blog", blog);

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Welcome to BlogList!</h2>
          <Link to="/blogs">Blogs</Link>
          <Link to="/create">Create</Link>
          <Link to="/login">Login</Link>
          <p>
            {user.username} logged in
            <button onClick={handleLogOut}>logout</button>
          </p>

          <Routes>
            <Route
              path="/"
              element={<Navigate to={"/blogs"}></Navigate>}
            ></Route>
            <Route path="/blogs" element={<BlogList></BlogList>}></Route>
            <Route path="/create" element={<CreateForm></CreateForm>}></Route>
            <Route
              path="/blogs/:id"
              element={<Blog blog={blog}></Blog>}
            ></Route>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
