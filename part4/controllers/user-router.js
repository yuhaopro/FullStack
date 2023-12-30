const userRouter = require("express").Router();
const User = require("../models/user");
const bycrypt = require("bcrypt");

// User Route Paths

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 5;
  const passwordHash = await bycrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  console.log("savedUser", savedUser);
  if (!savedUser) {
    return;
  }
  response.status(201).json(savedUser);
});

module.exports = userRouter;
