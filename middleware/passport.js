const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcryptjs')
const extractJwt = require('passport-jwt').ExtractJwt
const config = require('config')
const randomstring = require('randomstring')
const emailSender = require('../config/mailer/emailSender')

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
        if (user && user.local.active) {
          return done(null, false, {
            msg: 'This email is already taken'
          })
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Generate activation token
        const activationToken = randomstring.generate()

        if (user) {
          user.local = {
            ...user.local,
            displayName: req.body.displayName,
            password: hashedPassword,
            activationToken
          }
        } else {
          user = new User({
            local: {
              displayName: req.body.displayName,
              email,
              password: hashedPassword,
              activationToken
            }
          })
        }

        // Save user
        await user.save()

        // Send verification email
        await emailSender({
          emailType: 'verification',
          subject: 'Email Verification',
          receivers: email,
          context: {
            activationToken
          }
        })

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
            msg: 'Invalid credentials'
          })
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.local.password)
        if (!isMatch) {
          return done(null, false, {
            msg: 'Invalid credentials'
          })
        }

        // Check if user is activated
        if (!user.local.active) {
          return done(null, false, {
            msg: 'User email is not verified'
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
        user = await User.findById(jwtPayload.user.id).select('-local.password')
        if (!user) {
          return done(null, false, {
            msg: 'Authorization denied'
          })
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
