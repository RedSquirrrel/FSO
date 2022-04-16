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
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { requestLogger, unknowEndpoint, errorHandler };
