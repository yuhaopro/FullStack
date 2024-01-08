import { useState, useEffect } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const useAuth = (setMessage) => {
  const [user, setUser] = useState(null);

  // get local storage user session if it exists for the first time.
  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      // loginService.login is an API call
      const user = await loginService.login({ username, password });

      // saved to browser for caching
      window.localStorage.setItem("user", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      return true;
    } catch (error) {
      setMessage("Wrong Credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return false;
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return { user, handleLogin, handleLogOut };
};

export default useAuth;
