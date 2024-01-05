import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
  }, [user]);

  const handleLogin = async (username, password) => {
    try {
      // loginService.login is an API call
      const user = await loginService.login({ username, password });

      // saved to browser for caching
      window.localStorage.setItem("user", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);

  }

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
          {user.username} logged in <button onClick={handleLogOut}>logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
