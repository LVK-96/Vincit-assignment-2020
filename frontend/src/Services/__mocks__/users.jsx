// Mock users service
const users = [
  {
    id: 'id',
    points: 20,
  },
];

const setToken = () => {};
const setId = () => {};

const getUser = () => {
  return Promise.resolve(users[0]);
};

const createUser = () => {
  return Promise.resolve({ ...users[0], token: 'token' });
};

const resetPoints = () => {
  return Promise.resolve({ ...users[0], points: 20 });
};

export default {
  setToken,
  setId,
  getUser,
  createUser,
  resetPoints,
};
