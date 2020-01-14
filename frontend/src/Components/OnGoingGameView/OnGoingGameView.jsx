import React, { useState } from 'react';
import utils from '../../utils';
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
  setMessage, setPoints, message, points,
}) => {
  const [currentTimeOut, setCurrentTimeOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageBackgroundColor, setMessageBackGroundColor] = useState('white');

  const handlePlayClick = async () => {
    try {
      clearTimeout(currentTimeOut);
      setLoading(true); // Disable button whilst updating points
      const result = await gameService.play();
      setPoints(points - 1 + result.reward);
      setMessage(result);
      if (!result.reward) setMessageBackGroundColor('red');
      else setMessageBackGroundColor('green');
      setLoading(false);
      setCurrentTimeOut(setTimeout(() => {
        setMessage(null);
        setMessageBackGroundColor('white');
      }, 5000));
    } catch (e) {
      window.alert('Failed to play game!');
      setLoading(false);
      setMessageBackGroundColor('white');
    }
  };

  const handleRestartClick = async () => {
    try {
      setLoading(true); // Disable button whilst updating points
      const response = await gameService.restart();
      setMessage(null);
      setPoints(20);
      utils.setServiceToken(response.token);
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
