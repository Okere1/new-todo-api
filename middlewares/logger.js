// Application Request Logger
const requestLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();

  console.log(`${timeStamp} - ${req.method} - ${req.url} - ${req.ip}`);
  next();
};

module.exports = requestLogger;
