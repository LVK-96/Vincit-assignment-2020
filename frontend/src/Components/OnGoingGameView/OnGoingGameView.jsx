import React, { useState } from 'react';
import gameService from '../../Services/game';
import Button from '../Button';
import Points from '../Points';
import GameMessage from '../GameMessage';
import './OnGoingGameView.css';

const MessageContainer = ({ loading, messageBackgroundColor, message }) => {
  const msg = message ? `Sait ${message.reward} pistettä, seuraavaan voittoon ${message.untillNext} painallusta!` : '';
  if (!loading) {
    return (
      <div style={{ backgroundColor: messageBackgroundColor, color: 'white' }} className="messageContainer">
        <GameMessage message={msg} />
      </div>
    );
  }

  return (
    <div className="messageContainer">
      ...
    </div>
  );
};

const OnGoingGameView = ({
  setMessage, setPoints, setId, message, points, id,
}) => {
  const [loading, setLoading] = useState(false);
  const [messageBackgroundColor, setMessageBackGroundColor] = useState('white');

  const handlePlayClick = async () => {
    try {
      setLoading(true); // Disable button whilst updating points
      const result = await gameService.play(id);
      setPoints(points - 1 + result.reward);
      setMessage(result);
      setMessageBackGroundColor('green');
      if (!result.reward) setMessageBackGroundColor('red');
      setLoading(false);
    } catch (e) {
      window.alert('Failed to play game!');
      setLoading(false);
      setMessageBackGroundColor('white');
    }
  };

  const handleRestartClick = async () => {
    try {
      setLoading(true); // Disable button whilst updating points
      const response = await gameService.restart(id);
      localStorage.setItem('id', response.id);
      setMessage(null);
      setPoints(response.amount);
      setId(response.id);
      setLoading(false);
      setMessageBackGroundColor('white');
    } catch (e) {
      window.alert('Failed to restart game!');
      setLoading(false);
      setMessageBackGroundColor('white');
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
      <MessageContainer
        message={message}
        loading={loading}
        messageBackgroundColor={messageBackgroundColor}
      />
      <div className="gameContainer">
        <div className="gameButtonContainer">
          <Button className="gameButton" text={buttonText} handleClick={handleButtonClick} disabled={loading} visible />
        </div>
        <div className="pointsContainer">
          <Points className="points" points={points} />
        </div>
      </div>
    </>
  );
};

export default OnGoingGameView;
