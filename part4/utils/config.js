// to allow the use of .env file to store secrets
require("dotenv").config();

// this file serves to store and handle all environment variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
