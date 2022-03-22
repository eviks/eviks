require('./middleware/passport');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const next = require('next');
const logger = require('./utils/logger');
const connectDB = require('./config/db');

// Connect database
connectDB();

const hostname = 'localhost';
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname, port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Init middlewares & 3rd party libraries
  server.use(express.json({ extended: false }));
  server.use(passport.initialize());
  server.use(cors());
  server.use(fileUpload());
  server.use('/uploads', express.static('./uploads'));
  server.use(compression());

  // Define routes
  server.use('/api/auth', require('./routes/api/auth'));
  server.use('/api/users', require('./routes/api/users'));
  server.use('/api/posts', require('./routes/api/posts'));
  server.use('/api/localities', require('./routes/api/localities'));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`Server started on port ${port}...`);
  });
});
