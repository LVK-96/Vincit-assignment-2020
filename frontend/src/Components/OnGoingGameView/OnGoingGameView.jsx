import React, { useState } from 'react';
import gameService from '../../Services/game';
import Button from '../Button';
import Points from '../Points';
import GameMessage from '../GameMessage';
import './OnGoingGameView.css';

const OnGoingGameView = ({
  setMessage, setPoints, setId, message, points, id,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handlePlayClick = async () => {
    try {
      setButtonDisabled(true); // Disable button whilst updating points
      const result = await gameService.play(id);
      setPoints(points - 1 + result.reward);
      setMessage(result);
      setButtonDisabled(false);
    } catch (e) {
      window.alert('Failed to play game!');
      setButtonDisabled(false);
    }
  };

  const handleRestartClick = async () => {
    try {
      setButtonDisabled(true); // Disable button whilst updating points
      const response = await gameService.restart(id);
      localStorage.setItem('id', response.id);
      setMessage(null);
      setPoints(response.amount);
      setId(response.id);
      setButtonDisabled(false);
    } catch (e) {
      window.alert('Failed to restart game!');
      setButtonDisabled(false);
    }
  };

  let buttonText = 'Pelaa';
  let handleButtonClick = handlePlayClick;
  if (points < 1) {
    buttonText = 'Aloita alusta';
    handleButtonClick = handleRestartClick;
  }

  let msg = message ? `Sait ${message.reward} pistettä, seuraavaan voittoon ${message.untillNext} painallusta!` : '';
  if (buttonDisabled) {
    msg = '...';
  }

  return (
    <>
      <div className="messageContainer">
        <GameMessage message={msg} />
      </div>
      <div className="gameContainer">
        <div className="gameButtonContainer">
          <Button className="gameButton" text={buttonText} handleClick={handleButtonClick} disabled={buttonDisabled} visible />
        </div>
        <div className="pointsContainer">
          <Points className="points" points={points} />
        </div>
      </div>
    </>
  );
};

export default OnGoingGameView;
