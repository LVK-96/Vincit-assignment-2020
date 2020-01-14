const errorHandler = (error, request, response, next) => {
  // Handle errors
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' });
  }

  next(error); // Pass on to default error handler
};


const tokenExtractor = (request, response, next) => {
  // Extract token from Authorization header
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

module.exports = { errorHandler, tokenExtractor };
