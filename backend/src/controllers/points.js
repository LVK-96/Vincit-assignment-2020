const pointsRouter = require('express').Router();
const Points = require('../models/points');

pointsRouter.get('/:id', async (request, response, next) => {
  try {
    const points = await Points.findById(request.params.id);
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
    response.json(savedPoints.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = pointsRouter;
