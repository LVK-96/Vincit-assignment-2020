const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (request.params.id !== decodedToken.id) return response.status(401).end();
    const user = await User.findById(decodedToken.id);
    if (!user) return response.status(404).end(); // No user found for id
    response.json(user.toJSON()); // Return found user
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const user = new User({ points: 20 });
    const savedUser = await user.save();
    // Generate token for new user
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET);
    response.json({ ...savedUser.toJSON(), token }); // Return user and token
  } catch (e) {
    next(e);
  }
});

usersRouter.put('/:id/reset', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (request.params.id !== decodedToken.id) return response.status(401).end();
    const user = await User.findByIdAndUpdate(decodedToken.id, { points: 20 }, { new: true });
    if (!user) return response.status(404).end(); // No user found for id
    response.json(user.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
