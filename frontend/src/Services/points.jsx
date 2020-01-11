import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const getPoints = async (id) => {
  const response = await axios.get(`${baseUrl}/points/${id}`);
  return response.data;
};

const createPoints = async () => {
  const response = await axios.post(`${baseUrl}/points`);
  return response.data;
};

export default { getPoints, createPoints };
