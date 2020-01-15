import React, { useState } from 'react';
import gameService from '../../Services/game';
import usersService from '../../Services/users';
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
  // Keep track of ongoing timeout so it can be canceled
  const [currentTimeOut, setCurrentTimeOut] = useState(null);
  // When loading, disable button and show loading icon instead of message
  const [loading, setLoading] = useState(false);
  const [messageBackgroundColor, setMessageBackGroundColor] = useState('white');

  const handlePlayClick = async () => {
    try {
      clearTimeout(currentTimeOut); // Stop old timeout so message doesn't get hidden too soon
      setLoading(true);

      const result = await gameService.play();
      setPoints(points - 1 + result.reward);
      setMessage(result);
      if (!result.reward) setMessageBackGroundColor('red');
      else setMessageBackGroundColor('green');

      setCurrentTimeOut(setTimeout(() => {
        setMessage(null);
        setMessageBackGroundColor('white');
      }, 5000)); // Message is visible for 5 seconds

      setLoading(false);
    } catch (e) {
      window.alert('Failed to play game!');
      setLoading(false);
      setMessageBackGroundColor('white');
    }
  };

  const handleRestartClick = async () => {
    try {
      setLoading(true);

      const user = await usersService.resetPoints();
      setMessage(null);
      setPoints(user.points);
      setMessageBackGroundColor('white');

      setLoading(false);
    } catch (e) {
      window.alert('Failed to restart game!');
      setLoading(false);
      setMessageBackGroundColor('white');
    }
  };

  let buttonText = 'Pelaa';
  let handleButtonClick = handlePlayClick;
  // Show correct text and use correct click handler when game needs to be restarted
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
