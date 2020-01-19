const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const usersRouter = require('./controllers/users');
const { gameRouter, setGameStateId } = require('./controllers/game');
const GameState = require('./models/gameState');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('Connected to mongo');
  })
  .catch((e) => {
    logger.error('Error in connecting to mongo:', e.message);
  });

/*
 * Check if we have a game state in the db
 * If not create a new game state
 */

GameState.find({})
  .then((stateFromDb) => {
    if (stateFromDb.length === 0) { // No gamestate in db
      const newState = new GameState();
      newState.save()
        .then((savedState) => {
          setGameStateId(savedState._id);
        });
    } else {
      setGameStateId(stateFromDb[0]._id);
    }
  });

const app = express();
app.use(cors({ maxAge: 600 }));
app.use(middleware.tokenExtractor);
app.use(bodyParser.json());
app.use(middleware.requestLogger);

// In e2e test environment expose /test/reset endpoint
if (config.NODE_ENV === 'e2e_test') {
  const testResetRouter = require('./controllers/testReset');
  app.use('/api/test', testResetRouter);
}

app.use('/api/users', usersRouter);
app.use('/api/game', gameRouter);
app.use(middleware.errorHandler);

module.exports = app;
