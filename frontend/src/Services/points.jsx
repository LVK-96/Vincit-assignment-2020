import axios from 'axios';

const baseUrl = 'http://localhost:8000/points';
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getPoints = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createPoints = async () => {
  const response = await axios.post(baseUrl);
  return response.data;
};

export default { setToken, getPoints, createPoints };
