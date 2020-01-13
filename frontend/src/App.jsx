import React, { useState, useEffect } from 'react';
import pointsService from './Services/points';
import NewGameView from './Components/NewGameView';
import OnGoingGameView from './Components/OnGoingGameView';

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

  const hasGame = !!id && (points !== null);
  if (hasGame) {
    return (
      <div className="App">
        <OnGoingGameView
          setMessage={setMessage}
          setPoints={setPoints}
          setId={setId}
          message={message}
          points={points}
          id={id}
        />
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
