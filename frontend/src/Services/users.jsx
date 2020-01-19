import axios from 'axios';
import mock from './__mocks__/users';

let baseUrl;
if (process.env.REACT_APP_E2E) {
  baseUrl = 'http://localhost:8000/api/users';
} else {
  baseUrl = `${process.env.REACT_APP_BACKEND_URI}/users`;
}

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

let id = null;
const setId = (newId) => {
  id = newId;
};

const getUser = async () => {
  if (process.env.REACT_APP_DEV) {
    return mock.getUser();
  }
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
  if (process.env.REACT_APP_DEV) {
    return mock.createUser();
  }

  // Start new game by creating a new user
  const response = await axios.post(baseUrl); // Returns user and token
  return response.data;
};

const resetPoints = async () => {
  if (process.env.REACT_APP_DEV) {
    return mock.resetPoints();
  }
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
