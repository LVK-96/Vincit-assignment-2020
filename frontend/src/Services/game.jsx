import axios from 'axios';

const baseUrl = 'http://localhost:8000/game';
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const play = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(`${baseUrl}/play`, {}, config);
  return response.data;
};

const restart = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(`${baseUrl}/restart`, {}, config);
  return response.data;
};

export default { setToken, play, restart };
