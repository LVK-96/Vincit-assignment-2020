import React, { useState, useEffect } from 'react';
import pointsService from './Services/points';
import gameService from './Services/game';
import NewGameView from './Components/NewGameView';
import Button from './Components/Button';
import GameMessage from './Components/GameMessage';
import Points from './Components/Points';

function App() {
  const [id, setId] = useState(null);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const idFromStorage = localStorage.getItem('id');
    if (idFromStorage) {
      setId(idFromStorage.toString());
    }
  }, []);

  useEffect(() => {
    if (id && points === null) {
      const fetchPoints = async () => {
        try {
          const newPoints = await pointsService.getPoints(id);
          setPoints(newPoints.amount);
        } catch (e) {
          window.alert('Failed to fetch points!');
        }
      };

      fetchPoints();
    }
  }, [id, points]);

  const handlePlayClick = async () => {
    try {
      const result = await gameService.play(id);
      setMessage(result);
      setPoints(points - 1 + result.win);
    } catch (e) {
      window.alert('Failed to play game!');
    }
  };

  const handleRestartClick = async () => {
    try {
      const response = await gameService.restart(id);
      localStorage.setItem('id', response.id);
      setPoints(response.amount);
      setId(response.id);
    } catch (e) {
      console.log(e);
      window.alert('Failed to restart game!');
    }
  };

  const hasGame = !!id && (points !== null);
  if (hasGame) {
    return (
      <div className="App">
        <Button text="Click me!" handleClick={handlePlayClick} disabled={points < 1} visible />
        <Points points={points} />
        <GameMessage message={message} />
        <Button text="Restart" handleClick={handleRestartClick} disabled={false} visible={points < 1} />
      </div>
    );
  }

  return (
    <div className="App">
      <NewGameView setPoints={setPoints} setId={setId} />
    </div>
  );
}

export default App;
