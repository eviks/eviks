require('./middleware/passport');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const http = require('http');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const next = require('next');
const mongoSanitize = require('express-mongo-sanitize');
const schedule = require('node-schedule');
const { Server } = require('socket.io');
const logger = require('./utils/logger');
const connectDB = require('./config/db');
const {
  archivePosts,
  archiveRejectedPosts,
  sendSubscriptionNotifications,
} = require('./utils/scheduleTasks');

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
  server.use(mongoSanitize());
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
  server.use('/api/subscriptions', require('./routes/api/subscriptions'));
  server.use('/api/chats', require('./routes/api/chats'));

  // Socket.io
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    // Listen for incoming chat messages
    socket.on('chatMessage', (data) => {
      console.log('Received message:', data);

      // Broadcast the message to all connected clients
      io.emit('chat message', data);
    });
  });

  // Schedule tasks
  schedule.scheduleJob('0 */1 * * * *', () => {
    archivePosts();
    archiveRejectedPosts();
  });

  const rule = new schedule.RecurrenceRule();
  rule.hour = 18;
  rule.minute = 0;
  rule.tz = 'Asia/Baku';
  schedule.scheduleJob(rule, () => {
    sendSubscriptionNotifications();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    logger.info(`Server started on port ${port}. ENV: ${process.env.NODE_ENV}`);
  });
});
