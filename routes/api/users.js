const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { check, oneOf, validationResult } = require('express-validator')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  '/',
  [
    check('displayName', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        console.error(err.message)
        return res.status(500).send('Server error...')
      } else if (info) {
        return res.status(400).json({ errors: [info] })
      }
      res.json({ message: 'User created' })
    })(req, res, next)
  }
)

// @route  PUT api/users
// @desc   Update user
// @access Private
router.put(
  '/',
  [
    check('displayName', 'Name is required').notEmpty(),
    oneOf([
      check('password', 'Password must be at least 6 characters long').isLength(
        {
          min: 6,
        }
      ),
      check('password', '...').isEmpty(),
    ]),
    passport.authenticate('jwt', { session: false }),
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    try {
      let updateQuery = { ...req.body }

      if (updateQuery.password) {
        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        updateQuery.password = hashedPassword
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateQuery,
        { new: true }
      ).select('-password')
      res.json(updatedUser)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route  PUT api/users/add_to_favorites
// @desc   Add post to user's favorites list
// @access Private
router.put(
  '/add_to_favorites/:postId',
  [passport.authenticate('jwt', { session: false })],

  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      user.favorites = { ...user.favorites, [req.params.postId]: true }
      await user.save()

      res.json({ favorites: user.favorites })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route  PUT api/users/remove_from_favorites
// @desc   Remove post from user's favorites list
// @access Private
router.put(
  '/remove_from_favorites/:postId',
  [passport.authenticate('jwt', { session: false })],

  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')

      if (!user.favorites) return res.json({ favorites: {} })

      const favorites = user.favorites

      const filtered = Object.keys(favorites)
        .filter((key) => key !== req.params.postId)
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: favorites[key],
          }
        }, {})

      user.favorites = filtered
      await user.save()

      res.json({ favorites: user.favorites })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route  POST api/users/:id
// @desc   Get user info
// @access Public
router.get('/:id', async (req, res) => {
  const id = req.params.id

  // Id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ errors: [{ msg: 'User not found' }] })
  }

  try {
    const user = await User.findById(id, { displayName: 1, createdAt: 1 })

    // User not found
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] })
    }

    return res.json(user)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error...')
  }
})

module.exports = router
