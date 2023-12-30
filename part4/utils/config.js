// to allow the use of .env file to store secrets
require("dotenv").config();

// this file serves to store and handle all environment variables
// use test mongodb during test runs
const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const SECRET = process.env.SECRET
module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
};
