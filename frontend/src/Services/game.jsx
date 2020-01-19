import axios from 'axios';
import mock from './__mocks__/game';

let baseUrl;
if (process.env.REACT_APP_E2E) {
  baseUrl = 'http://localhost:8000/api/game';
} else {
  baseUrl = `${process.env.REACT_APP_BACKEND_URI}/game`;
}

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const play = async () => {
  if (process.env.REACT_APP_DEV) {
    return mock.play();
  }

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

export default { setToken, play };
