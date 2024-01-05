import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  // get local storage user session if it exists for the first time.
  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);
  // at start get all blog objects
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user, blogs]);

  const handleLogin = async (username, password) => {
    try {
      // loginService.login is an API call
      const user = await loginService.login({ username, password });

      // saved to browser for caching
      window.localStorage.setItem("user", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setMessage("Wrong Credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleCreate = async (title, author, url) => {
    // input blank check
    if (title === "" || author === "" || url === "") {
      setMessage("Make sure all fields are filled");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }
    try {
      // blogs service api call
      const blogObject = {
        title: title,
        author: author,
        url: url,
      };
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(JSON.stringify(createdBlog)));
      setMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added!`
      );
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

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
