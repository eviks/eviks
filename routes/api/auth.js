const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const passport = require('passport')
const randomstring = require('randomstring')
const emailSender = require('../../config/mailer/emailSender')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

// @route GET api/auth
// @desc  Get user info via token
// @acess Public
router.get('/', async (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      console.error(err.message)
      return res.status(500).send('Server error...')
    } else if (info) {
      return res.status(400).json({ errors: [info] })
    }
    res.json(user)
  })(req, res, next)
})

// @route POST api/auth
// @desc  Authericate user & get user
// @acess Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    passport.authenticate('local-signin', (err, user, info) => {
      if (err) {
        console.error(err.message)
        return res.status(500).send('Server error...')
      } else if (info) {
        return res.status(400).json({ errors: [info] })
      }
      const payload = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      })
      res.json({ token })
    })(req, res, next)
  }
)

// @route POST api/auth/verification/:activationToken
// @desc  Email verification
// @acess Public
router.post('/verification/:activationToken', async (req, res, next) => {
  try {
    const { activationToken } = req.params

    // Find user by activation token
    let user = await User.findOne({
      'local.active': false,
      'local.activationToken': activationToken
    })

    // User not found
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Wrong activation token' }]
      })
    }

    // Update user
    user.local.active = true
    user.local.activationToken = undefined
    await user.save()

    // Login user
    const payload = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    })
    res.json({ token })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error...')
  }
})

// @route POST api/auth/reset_password
// @desc  Reset password
// @acess Public
router.post(
  '/reset_password',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    try {
      const { email } = req.body

      // Find user by email address
      let user = await User.findOne({
        'local.email': email
      })

      // User not found
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'No account with that email address exist' }]
        })
      }

      // Create reset password token
      const resetPasswordToken = randomstring.generate()

      // Update user
      user.local.resetPasswordToken = resetPasswordToken
      user.local.resetPasswordExpires = Date.now() + 3600000
      await user.save()

      // Send password reset email
      await emailSender({
        emailType: 'reset-password',
        subject: 'Please reset your password',
        receivers: email,
        context: {
          resetPasswordToken
        }
      })

      return res.send('Verification email sent')
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route POST api/auth/password_reset
// @desc  Resets users password
// @acess Public
router.post(
  '/password_reset/:token',
  [
    check('password', 'Password is required').exists(),
    check('confirm', 'Password confirm is required').exists()
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    try {
      const resetPasswordToken = req.params.token
      const { password, confirm } = req.body

      if (password !== confirm) {
        return res.status(400).json({
          errors: [{ msg: 'Passwords do not match' }]
        })
      }

      // Find user by reset password token
      let user = await User.findOne({
        'local.resetPasswordToken': resetPasswordToken,
        'local.resetPasswordExpires': {
          $gt: Date.now()
        }
      })

      // User not found
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Wrong reset password token' }]
        })
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Update user
      user.local.password = hashedPassword
      user.local.resetPasswordToken = undefined
      user.local.resetPasswordExpires = undefined
      await user.save()

      res.send('New password is successfully set')
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

module.exports = router
