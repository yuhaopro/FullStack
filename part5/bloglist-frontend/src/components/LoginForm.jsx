import { useState } from "react";
import Togglable from "../components/Togglable";
import PropTypes from "prop-types";

// create LoginForm React Component
const LoginForm = ({ onLogin }) => {
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

    await onLogin(username, password);
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
        ></input>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
