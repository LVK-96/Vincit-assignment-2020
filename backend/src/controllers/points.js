const pointsRouter = require('express').Router();
const Points = require('../models/points');

pointsRouter.get('/:id', async (request, response, next) => {
  console.log('GET points', request.params.id);
  try {
    const points = await Points.findById(request.params.id);
    response.json(points.toJSON());
  } catch (e) {
    console.log(e);
    next(e);
  }
});

pointsRouter.post('/', async (request, response, next) => {
  console.log('POST points');
  try {
    const points = new Points({
      amount: 20,
    });
    points.save();
    response.json(points.toJSON());
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = pointsRouter;
