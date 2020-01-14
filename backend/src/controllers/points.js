const pointsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Points = require('../models/points');

pointsRouter.get('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const points = await Points.findById(decodedToken.id);
    if (!points) response.status(404).end();
    response.json(points.toJSON());
  } catch (e) {
    next(e);
  }
});

pointsRouter.post('/', async (request, response, next) => {
  try {
    const points = new Points({ amount: 20 });
    const savedPoints = await points.save();
    const token = jwt.sign({ id: savedPoints._id }, process.env.SECRET);
    response.json({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = pointsRouter;
