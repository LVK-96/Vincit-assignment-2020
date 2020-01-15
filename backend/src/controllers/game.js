const gameRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

let state = 0; // Game state

gameRouter.post('/play', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) return response.status(404).end(); // No points entry for the provided id

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

    const newPoints = { points: user.points - 1 + reward };
    // Run validators to make sure points don't go below 0
    await User.findByIdAndUpdate(decodedToken.id, newPoints, { runValidators: true });
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
    await User.findByIdAndDelete(decodedToken.id); // Delete old user with 0 points
    const user = new User({ points: 20 }); // Create new user
    const savedUser = await user.save();
    // Generate token for new user
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET);
    response.json({ ...savedUser.toJSON(), token }); // Return user and token
  } catch (e) {
    next(e);
  }
});

module.exports = gameRouter;
