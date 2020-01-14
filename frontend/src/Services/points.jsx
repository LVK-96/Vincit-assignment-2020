import axios from 'axios';

const baseUrl = 'http://localhost:8000/points';
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getPoints = async () => {
  // Get points of ongoing game by token
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseUrl}/ongoing`, config);
  return response.data;
};

const createPoints = async () => {
  // Start new game by creating a points entry
  const response = await axios.post(baseUrl); // Returns token
  return response.data;
};

export default { setToken, getPoints, createPoints };
