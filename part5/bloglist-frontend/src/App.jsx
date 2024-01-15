import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import useAuth from "./hooks/useAuth";
import useBlogs from "./hooks/useBlogs";
import { useState, useRef } from "react";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  const { user, handleLogin, handleLogOut } = useAuth();
  const createFormRef = useRef();
  const closeCreateForm = () => {
    if (createFormRef.current && createFormRef.current.toggleVisiblity) {
      createFormRef.current.toggleVisiblity();
    }
  };
  const { blogs, handleCreate, handleLike, handleRemove, fetchBlogs } =
    useBlogs(user, closeCreateForm);
  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm onLogin={handleLogin} onFetchBlogs={fetchBlogs} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={handleLogOut}>logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={handleLike}
              onRemove={handleRemove}
            />
          ))}
          <h2>create new</h2>
          <Togglable buttonText="new blog" ref={createFormRef}>
            <CreateForm onCreate={handleCreate}></CreateForm>
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
