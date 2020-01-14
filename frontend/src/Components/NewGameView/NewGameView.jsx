import React from 'react';
import utils from '../../utils';
import pointsService from '../../Services/points';
import Button from '../Button';
import './NewGameView.css';

const NewGameView = ({ setPoints }) => {
  const handleNewGameClick = async () => {
    try {
      const response = await pointsService.createPoints();
      utils.setAndStoreToken(response.token);
      setPoints(20);
    } catch (e) {
      window.alert('Failed to start game!');
    }
  };

  return (
    <>
      <div className="buttonContainer">
        <Button className="gameButton" text="Uusi peli" handleClick={handleNewGameClick} disabled={false} visible />
      </div>
    </>
  );
};

export default NewGameView;
