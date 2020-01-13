import React, { useState, useEffect } from 'react';
import pointsService from './Services/points';
import NewGameView from './Components/NewGameView';
import OnGoingGameView from './Components/OnGoingGameView';

function App() {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const idFromStorage = localStorage.getItem('id');
    if (idFromStorage) {
      setId(idFromStorage.toString());
      const fetchPoints = async () => {
        try {
          const newPoints = await pointsService.getPoints(idFromStorage);
          setPoints(newPoints.amount);
          setLoading(false);
        } catch (e) {
          window.alert('Failed to fetch points!');
        }
      };

      fetchPoints();
    } else {
      setLoading(false);
    }
  }, []);

  if (!loading) {
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

  return (
    <div className="App">
      Loading...
    </div>
  );
}

export default App;
