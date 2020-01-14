const gameRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Points = require('../models/points');

let state = 0; // Game state

gameRouter.post('/play', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const points = await Points.findById(decodedToken.id);
    if (!points) return response.status(404).end(); // No points entry for the provided id

    const tmpState = state + 1;
    /*
     * Rewards:
     *  * Divisible by 500 => 250
     *  * Divisible by 100 => 40
     *  * Divisible by 10 => 5
     *
     *  * Player can't get multiple rewards in one click, only give the highest applicable
     */
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
    // Run validators to make sure points don't go below 0
    await Points.findByIdAndUpdate(decodedToken.id, newAmount, { runValidators: true });
    state = tmpState % 500; // Wrap game state to 0 once it hits 500
    // Return reward and clicks untill next win
    response.json({ reward, untillNext: 10 - (state % 10) });
  } catch (e) {
    next(e);
  }
});

gameRouter.post('/restart', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    await Points.findByIdAndDelete(decodedToken.id); // Delete old points which are 0
    const points = new Points({ amount: 20 }); // Create new points
    const savedPoints = await points.save();
    // Generate token for new points
    const token = jwt.sign({ id: savedPoints._id }, process.env.SECRET);
    response.json({ token }); // Return token
  } catch (e) {
    next(e);
  }
});

module.exports = gameRouter;
