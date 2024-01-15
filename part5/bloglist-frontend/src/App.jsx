import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import useAuth from "./hooks/useAuth";
import useBlogs from "./hooks/useBlogs";
import { useState, useRef } from "react";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { BlogList } from "./components/BlogList";

const App = () => {
  const { user, handleLogin, handleLogOut } = useAuth();

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={handleLogOut}>logout</button>
          </p>
          <BlogList></BlogList>
          <h2>create new</h2>
          <CreateForm></CreateForm>
        </div>
      )}
    </div>
  );
};

export default App;
