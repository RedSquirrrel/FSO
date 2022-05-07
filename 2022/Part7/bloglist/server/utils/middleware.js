const jwt = require('jsonwebtoken');
const { logInfo, logError } = require('./logger');

const requestLogger = (request, response, next) => {
  logInfo('Method:', request.method);
  logInfo('Path:', request.path);
  logInfo('Body:', request.body);
  logInfo('-------------------');
  next();
};

const unknowEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknow Endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logError(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformated id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: `${error.message}` });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: `${error.message}` });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(400).json({ error: 'Token expired' });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    response.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

const userExtractor = (request, response, next) => {
  const user = jwt.verify(request.token, process.env.SECRET).id;
  request.user = user;
  next();
};

module.exports = { requestLogger, unknowEndpoint, errorHandler, tokenExtractor, userExtractor };
