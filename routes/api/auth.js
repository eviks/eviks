const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const passport = require('passport')

const User = require('../../models/User')

// @route GET api/auth
// @desc  Get user info via token
// @acess Public
router.get('/', async (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Server error...')
    } else if (info) {
      return res.status(400).json({ errors: [info] })
    }
    res.json(user)
  })(req, res, next)
})

// @route POST api/users
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
        console.error(err)
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

module.exports = router
