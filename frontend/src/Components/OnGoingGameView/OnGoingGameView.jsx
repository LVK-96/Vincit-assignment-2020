import React from 'react';
import gameService from '../../Services/game';
import Button from '../Button';
import Points from '../Points';
import GameMessage from '../GameMessage';

const OnGoingGameView = ({
  setMessage, setPoints, setId, message, points, id,
}) => {
  const handlePlayClick = async () => {
    try {
      const result = await gameService.play(id);
      setMessage(result);
      setPoints(points - 1 + result.win);
    } catch (e) {
      window.alert('Failed to play game!');
    }
  };

  const handleRestartClick = async () => {
    try {
      const response = await gameService.restart(id);
      localStorage.setItem('id', response.id);
      setPoints(response.amount);
      setId(response.id);
    } catch (e) {
      console.log(e);
      window.alert('Failed to restart game!');
    }
  };
  return (
    <div>
      <Button text="Click me!" handleClick={handlePlayClick} disabled={points < 1} visible />
      <Points points={points} />
      <GameMessage message={message} />
      <Button text="Restart" handleClick={handleRestartClick} disabled={false} visible={points < 1} />
    </div>
  );
};

export default OnGoingGameView;
