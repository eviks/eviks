const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const passport = require('passport')

// @route POST api/users
// @desc  Register user
// @acess Public
router.post(
  '/',
  [
    check('displayName', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6
    })
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Server error...')
      } else if (info) {
        return res.status(400).json({ errors: [info] })
      }
      res.send('User created')
    })(req, res, next)
  }
)

module.exports = router
