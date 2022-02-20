const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/logger');

const URI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    logger.info('MongoDB connected...');
  } catch (error) {
    logger.error(error.message);
    // Exit process with a failure
    throw error;
  }
};

module.exports = connectDB;
