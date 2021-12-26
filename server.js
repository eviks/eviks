require('./middleware/passport');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

// Connect database
connectDB();

// Init middlewares & 3rd party libraries
app.use(express.json({ extended: false }));
app.use(passport.initialize());
app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('API running...'));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/localities', require('./routes/api/localities'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
