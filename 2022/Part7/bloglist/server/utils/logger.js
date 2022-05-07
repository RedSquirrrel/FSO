const logInfo = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const logError = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

module.exports = { logInfo, logError };
