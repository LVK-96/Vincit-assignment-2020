const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const pointsRouter = require('./controllers/points');
const gameRouter = require('./controllers/game');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(middleware.tokenExtractor);
app.use(bodyParser.json());
app.use('/points', pointsRouter);
app.use('/game', gameRouter);
app.use(middleware.errorHandler);

module.exports = app;
