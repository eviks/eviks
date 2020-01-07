const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcryptjs')
const extractJwt = require('passport-jwt').ExtractJwt
const config = require('config')

const User = require('../models/User')

passport.use(
  'local-signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ 'local.email': email })
        if (user) {
          return done(null, false, {
            message: 'This email is already taken'
          })
        }

        // Encrypt password & save user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = new User({
          local: {
            displayName: req.body.displayName,
            email,
            password: hashedPassword
          }
        })

        await user.save()

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'local-signin',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        // Check if user exist
        let user = await User.findOne({ 'local.email': email })
        if (!user) {
          return done(null, false, {
            message: 'Invalid credentials'
          })
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.local.password)
        if (!isMatch) {
          return done(null, false, {
            message: 'Invalid credentials'
          })
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'jwt',
  new jwtStrategy(
    {
      jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: config.get('jwtSecret')
    },
    async (jwtPayload, done) => {
      try {
        user = await User.findById(jwtPayload.user.id).select('-password')
        if (!user) {
          return done(null, false, {
            message: 'Authorization denied'
          })
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
