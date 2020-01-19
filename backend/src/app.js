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
app.use(middleware.requestLogger);
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/game', gameRouter);

// In test environments expose /test/reset endpoint to clear database
if (config.NODE_ENV === 'test') {
  const testResetRouter = require('./controllers/testReset');
  app.use('/test', testResetRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
