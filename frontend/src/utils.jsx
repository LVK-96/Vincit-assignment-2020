import pointsService from './Services/points';
import gameService from './Services/game';

const setServiceToken = (token) => {
  localStorage.setItem('token', token);
  pointsService.setToken(token);
  gameService.setToken(token);
};

export default { setServiceToken };
