const gameRouter = require('express').Router();
const Points = require('../models/points');

let state = 0;

gameRouter.post('/play', async (request, response, next) => {
  try {
    const { body } = request;
    console.log('Play', body.id, state);
    state += 1;
    let reward;
    if (state % 500 === 0) {
      reward = 250;
    } else if (state % 100 === 0) {
      reward = 40;
    } else if (state % 10 === 0) {
      reward = 5;
    } else {
      reward = 0;
    }

    state %= 500;
    const points = await Points.findById(body.id);
    const newAmount = { amount: points.amount - 1 + reward };
    await Points.findByIdAndUpdate(body.id, newAmount, { new: true });
    response.json({ win: reward, untillNext: 10 - (state % 10) });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

gameRouter.post('/restart', async (request, response, next) => {
  try {
    const { body } = request;
    console.log('Restart', body.id);
    await Points.findByIdAndDelete(body.id);
    const points = new Points({
      amount: 20,
    });
    points.save();
    response.json(points.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = gameRouter;
