const express = require('express')
const app = express()

const passport = require('passport')

const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect database
connectDB()

// Passport config
require('./middleware/passport')

// Init middlewares
app.use(express.json({ extended: false }))
app.use(passport.initialize())

app.get('/', (req, res) => res.send('API running...'))

// Define routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
