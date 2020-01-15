import axios from 'axios';

const baseUrl = 'http://localhost:8000/users';
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getUser = async () => {
  // Get user by token
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseUrl}/byid`, config); // Return user
  return response.data;
};

const createUser = async () => {
  // Start new game by creating a new user
  const response = await axios.post(baseUrl); // Returns user and token
  return response.data;
};

export default { setToken, getUser, createUser };
