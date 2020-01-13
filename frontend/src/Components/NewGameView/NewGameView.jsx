import React from 'react';
import pointsService from '../../Services/points';
import Button from '../Button';
import './NewGameView.css';

const NewGameView = ({ setPoints, setId }) => {
  const handleNewGameClick = async () => {
    try {
      const response = await pointsService.createPoints();
      localStorage.setItem('id', response.id);
      setPoints(response.amount);
      setId(response.id);
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
