import React from 'react';
import pointsService from '../../Services/points';
import Button from '../Button';

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
    <div>
      <Button text="New game!" handleClick={handleNewGameClick} disabled={false} visible />
    </div>
  );
};

export default NewGameView;
