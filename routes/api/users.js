const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const passport = require('passport')
const postSearch = require('../../middleware/postSearch')

const Post = require('../../models/Post')

// @route  POST api/users
// @desc   Register user
// @access Public
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
        console.error(err.message)
        return res.status(500).send('Server error...')
      } else if (info) {
        return res.status(400).json({ errors: [info] })
      }
      res.json({ message: 'User created' })
    })(req, res, next)
  }
)

// @route  POST api/users/favorites
// @desc   Add post to user's favorites list
// @access Private
router.post(
  '/favorites',
  [passport.authenticate('jwt', { session: false })],

  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      user.favorites = { ...user.favorites, [req.body.postId]: true }
      await user.save()

      res.json({ favorites: user.favorites })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route  DELETE api/users/favorites
// @desc   Remove post from user's favorites list
// @access Private
router.delete(
  '/favorites/:postId',
  [passport.authenticate('jwt', { session: false })],

  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')

      if (!user.favorites) return res.json({ favorites: {} })

      const favorites = user.favorites

      const filtered = Object.keys(favorites)
        .filter(key => key !== req.params.postId)
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: favorites[key]
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

// @route  GET api/users/:id/posts
// @desc   Remove post from user's favorites list
// @access Public
router.get('/:id/posts', [postSearch], async (req, res) => {
  let posts = {}
  let result = []

  const {
    conditions,
    paginatedResults: { pagination, limit, startIndex }
  } = req

  try {
    result = await Post.find(conditions)
      .limit(limit)
      .skip(startIndex)
      .sort({ date: -1 })

    posts.result = result
    posts.pagination = pagination

    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error...')
  }
})

module.exports = router
