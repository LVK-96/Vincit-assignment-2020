import React, { useState, useEffect } from 'react';

import pointsService from './Services/points';
import gameService from './Services/game';
import Button from './Components/Button';
import GameMessage from './Components/GameMessage';
import Points from './Components/Points';

function App() {
  const [points, setPoints] = useState(20);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const newPoints = await pointsService.getPoints(1);
        setPoints(newPoints);
      } catch (e) {
        window.alert('Failed to fetch points!');
      }
    };

    fetchPoints();
  }, []);

  const handlePlayClick = () => {
    const result = gameService.play(1);
    setResponse(result);
    setPoints(points - 1 + result.win);
  };

  const handleRestartClick = () => {
    gameService.restart(1);
    setPoints(20);
  };

  return (
    <div className="App">
      <Button text="Click me!" handleClick={handlePlayClick} disabled={points < 1} visible />
      <Points points={points} />
      <GameMessage response={response} />
      <Button text="Restart" handleClick={handleRestartClick} disabled={false} visible={points < 1} />
    </div>
  );
}

export default App;
