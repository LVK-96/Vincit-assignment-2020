const router = require('express').Router();
const { setGameStateId } = require('./game');
const GameState = require('../models/gameState');
const User = require('../models/user');

router.post('/reset', async (request, response) => {
  // Clear database
  await GameState.deleteMany({});
  await User.deleteMany({});

  const newState = new GameState();
  const savedState = await newState.save();
  setGameStateId(savedState._id);

  response.status(204).end();
});

module.exports = router;
