import axios from 'axios';

const baseUrl = 'http://localhost:8000/users';
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

let id = null;
const setId = (newId) => {
  id = newId;
};

const getUser = async () => {
  // Get user by token
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseUrl}/${id}`, config); // Return user
  return response.data;
};

const createUser = async () => {
  // Start new game by creating a new user
  const response = await axios.post(baseUrl); // Returns user and token
  return response.data;
};

const resetPoints = async () => {
  // Start new game by reseting users points
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}/reset`, {}, config); // Return user
  return response.data;
};

export default {
  setToken,
  setId,
  getUser,
  createUser,
  resetPoints,
};
