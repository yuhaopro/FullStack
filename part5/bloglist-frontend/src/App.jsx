import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import useAuth from "./hooks/useAuth";
import useBlogs from "./hooks/useBlogs";
import { useState } from "react";

const App = () => {
  const [message, setMessage] = useState(null);
  const { user, handleLogin, handleLogOut } = useAuth(setMessage);
  const { blogs, handleCreate } = useBlogs(user, setMessage);
  return (
    <div>
      {message && <p>{message}</p>}
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogOut}>logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <h2>create new</h2>
          <CreateForm onCreate={handleCreate}></CreateForm>
        </div>
      )}
    </div>
  );
};

export default App;
