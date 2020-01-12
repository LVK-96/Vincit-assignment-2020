const gameRouter = require('express').Router();
const Points = require('../models/points');

let state = 0;

gameRouter.post('/play', async (request, response, next) => {
  try {
    const { body } = request;
    console.log('Play', body.id, state);
    let tmpState = state + 1;
    let reward;
    if (tmpState % 500 === 0) {
      reward = 250;
    } else if (tmpState % 100 === 0) {
      reward = 40;
    } else if (tmpState % 10 === 0) {
      reward = 5;
    } else {
      reward = 0;
    }

    tmpState %= 500;
    const points = await Points.findById(body.id);
    const newAmount = { amount: points.amount - 1 + reward };
    await Points.findByIdAndUpdate(body.id, newAmount, { new: true });
    response.json({ win: reward, untillNext: 10 - (tmpState % 10) });
    state = tmpState;
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
    const points = new Points({ amount: 20 });
    const savedPoints = await points.save();
    response.json(savedPoints.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = gameRouter;
