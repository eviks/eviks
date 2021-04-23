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
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const errorMessages = []

        // Check if user already exists
        let user = await User.findOne({ email: email })
        if (user && user.active) {
          errorMessages.push({
            param: 'email',
            msg: 'This email is already taken',
          })
        }

        // Check if username is unique
        let userByUsername = await User.findOne({ username: req.body.username })
        if (
          userByUsername &&
          (user && !user.active ? !userByUsername._id.equals(user._id) : true)
        ) {
          errorMessages.push({
            param: 'username',
            msg: 'This username is already taken',
          })
        }

        if (errorMessages.length > 0) return done(null, false, errorMessages)

        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Generate activation token
        const activationToken = randomstring.generate()

        if (user) {
          user.username = req.body.username
          user.displayName = req.body.displayName
          user.password = hashedPassword
          user.activationToken = activationToken
        } else {
          user = new User({
            username: req.body.username,
            displayName: req.body.displayName,
            email,
            password: hashedPassword,
            activationToken,
          })
        }

        // Save user
        await user.save()

        // Send verification email
        const result = await emailSender({
          emailType: 'verification',
          subject: 'Email Verification',
          receivers: email,
          context: {
            activationToken,
          },
        })

        if (!result.success) throw result.error

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
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        // Check if user exist
        let user = await User.findOne({
          $or: [{ email: username }, { username }],
        })
        if (!user) {
          return done(null, false, {
            msg: 'Invalid credentials',
          })
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, {
            msg: 'Invalid credentials',
          })
        }

        // Check if user is activated
        if (!user.active) {
          return done(null, false, {
            msg: 'User email is not verified',
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
      secretOrKey: config.get('jwtSecret'),
    },
    async (jwtPayload, done) => {
      try {
        user = await User.findById(jwtPayload.user.id).select('-password')
        if (!user) {
          return done(null, false, {
            msg: 'Authorization denied',
          })
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
