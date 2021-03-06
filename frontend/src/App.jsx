import React, { useState, useEffect } from 'react';
import utils from './utils';
import usersService from './Services/users';
import NewGameView from './Components/NewGameView';
import OnGoingGameView from './Components/OnGoingGameView';

function App() {
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {

    /*
     * The user id that is used to authorize a user to play the game is encoded in JSON web token.
     * The backend decodes the token and uses the id to find corresponding points.
     * We could also use just use the plain id for this but it is easily guessable by other users.
     */

    const tokenFromStorage = localStorage.getItem('token');
    const idFromStorage = localStorage.getItem('id');
    if (tokenFromStorage && idFromStorage) {
      // If token was found from local storage, fetch points by token
      const fetchUser = async () => {
        try {
          const newUser = await usersService.getUser();
          setPoints(newUser.points);
          setLoading(false);
        } catch (e) {
          window.alert('Failed to fetch points!');
          setLoading(false);
        }
      };

      utils.setAndStoreToken(tokenFromStorage);
      utils.setAndStoreId(idFromStorage);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []); // Run this effect only on initial render

  if (!loading) {
    if (points !== null) { // If player has non-null points a game is ongoing
      return (
        <div className="on-going-game-container">
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
      <div className="new-game-container">
        <NewGameView setPoints={setPoints} />
      </div>
    );
  }

  return (
    <div className="loading">
      Lataa...
    </div>
  );
}

export default App;
