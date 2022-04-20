const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const { logInfo, logError } = require('./utils/logger');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logInfo('Connected to MOngoDB');
  })
  .catch(error => {
    logError('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
