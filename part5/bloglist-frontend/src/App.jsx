import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import { BlogList } from "./components/BlogList";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";
import LogOut from "./components/LogOut";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";

const App = () => {
  // get user data from browser;
  let user = useSelector((state) => state.user);

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const blogs = blogsQuery.data;
  // console.log("Blogs", blogs);

  const match = useMatch("/blogs/:id");
  const blog =
    match && blogs ? blogs.find((blog) => blog.id === match.params.id) : null;
  // console.log("Blog", blog);

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>{`Welcome ${user.username}!`}</h2>
          <Link to="/blogs">Blogs</Link>
          <Link to="/create">Create</Link>
          <Link to="/logout">Logout</Link>

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
            <Route path="/logout" element={<LogOut></LogOut>}></Route>
            <Route path="/login" element={<LoginForm></LoginForm>}></Route>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
