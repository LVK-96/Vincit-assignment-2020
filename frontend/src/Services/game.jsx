import axios from 'axios';

const baseUrl = 'http://localhost:8000/game';
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const play = async () => {
  // Play the game
  const config = {
    headers: {
      Authorization: token,
    },
  };

  // Returns reward and clicks untill next win
  const response = await axios.post(`${baseUrl}/play`, {}, config);
  return response.data;
};

const restart = async () => {
  // Restart game (delete old game and create a new one)
  const config = {
    headers: {
      Authorization: token,
    },
  };

  // Returns token
  const response = await axios.post(`${baseUrl}/restart`, {}, config);
  return response.data;
};

export default { setToken, play, restart };
