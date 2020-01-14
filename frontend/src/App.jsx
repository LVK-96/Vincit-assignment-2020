import React, { useState, useEffect } from 'react';
import utils from './utils';
import pointsService from './Services/points';
import NewGameView from './Components/NewGameView';
import OnGoingGameView from './Components/OnGoingGameView';

function App() {
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      const fetchPoints = async () => {
        try {
          const newPoints = await pointsService.getPoints();
          setPoints(newPoints.amount);
          setLoading(false);
        } catch (e) {
          window.alert('Failed to fetch points!');
          setLoading(false);
        }
      };

      utils.setServiceToken(tokenFromStorage);
      fetchPoints();
    } else {
      setLoading(false);
    }
  }, []);

  if (!loading) {
    const hasGame = (points !== null);
    if (hasGame) {
      return (
        <div className="onGoingGameContainer">
          <OnGoingGameView
            setMessage={setMessage}
            setPoints={setPoints}
            message={message}
            points={points}
          />
        </div>
      );
    }

    return (
      <div className="newGameContainer">
        <NewGameView setPoints={setPoints} />
      </div>
    );
  }

  return (
    <div className="loading">
      Loading...
    </div>
  );
}

export default App;
