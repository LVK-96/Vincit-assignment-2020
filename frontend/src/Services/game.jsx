import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const play = async (id) => {
  const response = await axios.post(`${baseUrl}/game/play`, {
    id,
  });

  return response.data;
};

export default { play };
