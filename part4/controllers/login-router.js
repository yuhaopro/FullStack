const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");

// login route
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // finds the first matching username
  const user = await User.findOne({ username });

  // compare password if user can be found
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // if either user or password are not correct, return error
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  // client side token
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, id: user._id });
});

module.exports = loginRouter;
