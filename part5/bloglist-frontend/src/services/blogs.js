import axios from "axios";
const baseUrl = import.meta.env.VITE_BLOGS_URL;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  // console.log("token set");
  // console.log("token", token)
};

const getConfig = () => ({
  headers: { Authorization: token },
});

// get blogs
const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

// create blog
const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  // console.log("response",response.data);
  return response.data;
};

// update blog
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfig());
  // console.log(response.data);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default { getAll, create, update, deleteBlog, setToken };
