import React from 'react';
import utils from '../../utils';
import usersService from '../../Services/users';
import Button from '../Button';
import './NewGameView.css';

const NewGameView = ({ setPoints }) => {
  const handleNewGameClick = async () => {
    try {
      const user = await usersService.createUser();
      utils.setAndStoreToken(user.token);
      utils.setAndStoreId(user.id);
      setPoints(user.points);
    } catch (e) {
      window.alert('Failed to start game!');
    }
  };

  return (
    <>
      <div className="button-container">
        <Button className="game-button" text="Uusi peli" handleClick={handleNewGameClick} disabled={false} visible />
      </div>
    </>
  );
};

export default NewGameView;
