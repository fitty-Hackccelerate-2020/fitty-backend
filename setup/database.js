const mongoose = require('mongoose');

const logger = require('./logger');

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('MongoDB connected!'))
  .catch((e) => logger.error(e));

module.exports = mongoose.connection;
