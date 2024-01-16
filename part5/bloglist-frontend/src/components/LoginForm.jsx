import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setUser } from "../reducers/userReducer";
import { useNavigate } from "react-router";
import blogService from "../services/blogs";

// create LoginForm React Component
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      navigate("/blogs");
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // login user
    // set the received object to user state
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          id="username"
        ></input>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          value={password}
          onChange={handlePasswordChange}
          id="password"
        ></input>
      </div>

      <button type="submit" id="submit-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
