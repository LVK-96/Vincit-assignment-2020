const gameRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Points = require('../models/points');

let state = 0;

gameRouter.post('/play', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const points = await Points.findById(decodedToken.id);
    if (!points) return response.status(404).end();

    const tmpState = state + 1;
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

    const newAmount = { amount: points.amount - 1 + reward };
    await Points.findByIdAndUpdate(decodedToken.id, newAmount, { new: true, runValidators: true });
    state = tmpState % 500;
    response.json({ reward, untillNext: 10 - (state % 10) });
  } catch (e) {
    next(e);
  }
});

gameRouter.post('/restart', async (request, response, next) => {
  try {
    const { body } = request;
    await Points.findByIdAndDelete(body.id);
    const points = new Points({ amount: 20 });
    const savedPoints = await points.save();
    const token = jwt.sign({ id: savedPoints._id }, process.env.SECRET);
    response.json({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = gameRouter;
