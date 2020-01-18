const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const usersRouter = require('./controllers/users');
const { gameRouter, setGameStateId } = require('./controllers/game');
const GameState = require('./models/gameState');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

const createState = async () => { // Create game state if it doesn't exist
  const stateFromDb = await GameState.find({});
  if (stateFromDb.length === 0) { // No gamestate in db
    const newState = new GameState();
    const savedState = await newState.save();
    setGameStateId(savedState._id);
  } else {
    setGameStateId(stateFromDb[0]._id);
  }
};

createState();

const app = express();
app.use(cors({ maxAge: 600 }));
app.use(middleware.tokenExtractor);
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/game', gameRouter);
app.use(middleware.errorHandler);

module.exports = app;
