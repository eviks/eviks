const firebase = require('firebase-admin');
const serviceAccount = require('./firebase_key.json');
const logger = require('../utils/logger');

try {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
} catch (error) {
  logger.error(error);
}

module.exports = { firebase };
