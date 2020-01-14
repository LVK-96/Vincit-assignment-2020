import pointsService from './Services/points';
import gameService from './Services/game';

const setAndStoreToken = (token) => {
  // Set token to all services and store in local storage
  pointsService.setToken(token);
  gameService.setToken(token);
  localStorage.setItem('token', token);
};

export default { setAndStoreToken };
