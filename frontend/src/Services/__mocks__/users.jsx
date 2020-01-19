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
  return Promise.resolve(users[0])
}

export default { setToken, setId, getUser }
