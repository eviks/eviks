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
// @access Public
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
// @access Public
router.post(
  '/',
  [
    check('username', 'Username or email address is required').exists(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
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
          id: user.id,
        },
      }
      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000,
      })
      res.json({ token })
    })(req, res, next)
  }
)

// @route POST api/auth/verification/:activationToken
// @desc  Email verification
// @access Public
router.post('/verification/:activationToken', async (req, res, next) => {
  try {
    const { activationToken } = req.params

    // Find user by activation token
    let user = await User.findOne({
      active: false,
      activationToken: activationToken,
    })

    // User not found
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Wrong activation token' }],
      })
    }

    // Update user
    user.active = true
    user.activationToken = undefined
    await user.save()

    // Login user
    const payload = {
      user: {
        id: user.id,
      },
    }
    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000,
    })
    res.json({ token })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error...')
  }
})

// @route POST api/auth/create_reset_password_token
// @desc  Create reset password token
// @access Public
router.post(
  '/create_reset_password_token',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    try {
      const { email } = req.body

      // Find user by email address
      let user = await User.findOne({
        email: email,
      })

      // User not found
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'No account with that email address exist' }],
        })
      }

      // Create reset password token
      const resetPasswordToken = randomstring.generate()

      // Update user
      user.resetPasswordToken = resetPasswordToken
      user.resetPasswordExpires = Date.now() + 3600000
      await user.save()

      // Send password reset email
      const result = await emailSender({
        emailType: 'reset-password',
        subject: 'Please reset your password',
        receivers: email,
        context: {
          resetPasswordToken,
        },
      })

      if (!result.success) throw result.error

      return res.send('Reset password email sent')
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

router.post('/check_reset_password_token/:token', async (req, res) => {
  const resetPasswordToken = req.params.token

  try {
    // Find user by reset password token
    let user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    })

    // User not found
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Wrong reset password token' }],
      })
    }

    res.send('Reset-password-token is valid')
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error...')
  }
})

// @route POST api/auth/password_reset
// @desc  Resets users password
// @access Public
router.post(
  '/password_reset/:token',
  [
    check('password', 'Password is required').exists(),
    check('confirm', 'Password confirm is required').exists(),
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    try {
      const resetPasswordToken = req.params.token
      const { password, confirm } = req.body

      if (password !== confirm) {
        return res.status(400).json({
          errors: [{ msg: 'Passwords do not match' }],
        })
      }

      // Find user by reset password token
      let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      })

      // User not found
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Wrong reset password token' }],
        })
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Update user
      user.password = hashedPassword
      user.resetPasswordToken = undefined
      user.resetPasswordExpires = undefined
      await user.save()

      // Login user
      const payload = {
        user: {
          id: user.id,
        },
      }
      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000,
      })
      res.json({ token })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

module.exports = router
