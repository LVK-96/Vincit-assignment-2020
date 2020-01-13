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
      setPoints(points - 1 + result.win);
      setMessage(result);
    } catch (e) {
      window.alert('Failed to play game!');
    }
  };

  const handleRestartClick = async () => {
    try {
      const response = await gameService.restart(id);
      localStorage.setItem('id', response.id);
      setMessage(null);
      setPoints(response.amount);
      setId(response.id);
    } catch (e) {
      console.log(e);
      window.alert('Failed to restart game!');
    }
  };

  let buttonText = 'Pelaa';
  let handleButtonClick = handlePlayClick;
  if (points < 1) {
    buttonText = 'Aloita alusta';
    handleButtonClick = handleRestartClick;
  }

  return (
    <>
      <div className="messageContainer">
        <GameMessage message={message} />
      </div>
      <div className="gameContainer">
        <div className="gameButtonContainer">
          <Button className="gameButton" text={buttonText} handleClick={handleButtonClick} visible />
        </div>
        <div className="pointsContainer">
          <Points className="points" points={points} />
        </div>
      </div>
    </>
  );
};

export default OnGoingGameView;
