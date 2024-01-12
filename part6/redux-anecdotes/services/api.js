import axios from "axios";

const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(url);
  console.log("getAll", response.data);
  return response.data;
};

const createNew = async (anecdote) => {
  const object = { content: anecdote, votes: 0 };
  const response = await axios.post(url, object);
  console.log("createNew", response.data);
  return response.data;
};

export default { getAll, createNew };
