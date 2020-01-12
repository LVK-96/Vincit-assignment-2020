import React, { useState, useEffect } from 'react';

import pointsService from './Services/points';
import gameService from './Services/game';
import Button from './Components/Button';
import GameMessage from './Components/GameMessage';
import Points from './Components/Points';

function App() {
  const [id, setId] = useState(null);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchId = async () => {
      const idFromStorage = localStorage.getItem('id');
      if (idFromStorage) {
        setId(idFromStorage.toString());
      } else {
        try {
          const response = await pointsService.createPoints();
          setId(response.id);
          localStorage.setItem('id', response.id);
        } catch (e) {
          console.log(e);
          window.alert('Failed to create new game!');
        }
      }
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (id && points === null) {
      const fetchPoints = async () => {
        try {
          const newPoints = await pointsService.getPoints(id);
          setPoints(newPoints.amount);
        } catch (e) {
          console.log(e);
          window.alert('Failed to fetch points!');
        }
      };

      fetchPoints();
    }
  }, [id, points]);

  const handlePlayClick = async () => {
    const result = await gameService.play(id);
    setMessage(result);
    setPoints(points - 1 + result.win);
  };

  const handleRestartClick = async () => {
    const response = await gameService.restart(id);
    setPoints(20);
    localStorage.setItem('id', response.id);
    setId(response.id);
  };

  return (
    <div className="App">
      <Button text="Click me!" handleClick={handlePlayClick} disabled={points < 1} visible />
      <Points points={points} />
      <GameMessage message={message} />
      <Button text="Restart" handleClick={handleRestartClick} disabled={false} visible={points < 1} />
    </div>
  );
}

export default App;
