import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // at start get all blog objects
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);



  const handleLogin = async (username, password) => {
    try {
      // Assume loginService.login is an API call
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token)

      setUser(user);
    } catch (error) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>{user.username} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
