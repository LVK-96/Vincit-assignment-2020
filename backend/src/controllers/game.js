const gameRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { Sema } = require('async-sema');
const User = require('../models/user');
const GameState = require('../models/gameState');

let gameStateId = null;
const setGameStateId = (id) => {
  gameStateId = id;
};

const s = new Sema(1);

gameRouter.post('/play', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    let reward;
    let untillNext;
    await s.acquire(); // Semaphore to make sure only one player can update the state at a time
    try {
      const user = await User.findById(decodedToken.id);
      if (!user) return response.status(404).end(); // No points entry for the provided id
      if (user.points < 1) return response.status(403).end();
      const stateFromDb = await GameState.findById(gameStateId);
      let state = stateFromDb.state + 1;
      /*
       * Rewards:
       *  * Divisible by 500 => 250
       *  * Divisible by 100 => 40
       *  * Divisible by 10 => 5
       *
       *  * Player can't get multiple rewards in one click, only give the highest applicable
       */
      if (state % 500 === 0) {
        reward = 250;
      } else if (state % 100 === 0) {
        reward = 40;
      } else if (state % 10 === 0) {
        reward = 5;
      } else {
        reward = 0;
      }

      state %= 500; // Wrap game state to 0 once it hits 500
      untillNext = 10 - (state % 10);
      await GameState.findByIdAndUpdate(
        gameStateId, { state }, { runValidators: true, upsert: true },
      );

      const newPoints = { points: user.points - 1 + reward };
      // Run validators to make sure points don't go below 0
      await User.findByIdAndUpdate(decodedToken.id, newPoints, { runValidators: true });
    } catch (e) {
      next(e);
    } finally {
      s.release();
    }

    // Return reward and clicks untill next win
    response.json({ reward, untillNext });
  } catch (e) {
    next(e);
  }
});

module.exports = { gameRouter, setGameStateId };
