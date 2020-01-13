import React from 'react';
import gameService from '../../Services/game';
import Button from '../Button';
import Points from '../Points';
import GameMessage from '../GameMessage';
import './OnGoingGameView.css';

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
    <>
      <div className="messageContainer">
        <GameMessage message={message} />
      </div>
      <div className="gameContainer">
        <div className="playButtonContainer">
          <Button className="playButton" text="Pelaa" handleClick={handlePlayClick} disabled={points < 1} visible />
        </div>
        <div className="pointsContainer">
          <Points className="points" points={points} />
        </div>
      </div>
      <div className="restartContainer">
        <Button className="restartButton" text="Restart" handleClick={handleRestartClick} disabled={false} visible={points < 1} />
      </div>
    </>
  );
};

export default OnGoingGameView;
