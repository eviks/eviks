const fs = require('fs');
const express = require('express');
const router = express.Router();
const { check, oneOf, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const rimraf = require('rimraf');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  '/',
  [
    check('username', 'Username is required').notEmpty(),
    check('displayName', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server error...');
      } else if (info) {
        return res.status(400).json({ errors: info });
      }
      res.json({ message: 'User created' });
    })(req, res, next);
  },
);

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
        },
      ),
      check('password', '...').isEmpty(),
    ]),
    passport.authenticate('jwt', { session: false }),
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      let updateQuery = { ...req.body };

      if (updateQuery.password) {
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        updateQuery.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateQuery,
        { new: true },
      ).select('-password');
      res.json(updatedUser);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  PUT api/users/add_to_favorites
// @desc   Add post to user's favorites list
// @access Private
router.put(
  '/add_to_favorites/:postId',
  [passport.authenticate('jwt', { session: false })],

  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      user.favorites = { ...user.favorites, [req.params.postId]: true };
      await user.save();

      res.json({ favorites: user.favorites });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  PUT api/users/remove_from_favorites
// @desc   Remove post from user's favorites list
// @access Private
router.put(
  '/remove_from_favorites/:postId',
  [passport.authenticate('jwt', { session: false })],

  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');

      if (!user.favorites) return res.json({ favorites: {} });

      const favorites = user.favorites;

      const filtered = Object.keys(favorites)
        .filter((key) => key !== req.params.postId)
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: favorites[key],
          };
        }, {});

      user.favorites = filtered;
      await user.save();

      res.json({ favorites: user.favorites });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  POST api/users/:username
// @desc   Get user info
// @access Public
router.get('/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne(
      { username },
      { displayName: 1, createdAt: 1 },
    );

    // User not found
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error...');
  }
});

// @route  DELETE api/users
// @desc   Delete user
// @access Private
router.delete(
  '/',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    try {
      // Delete user posts first
      const posts = await Post.find({ user: req.user.id });

      posts.forEach(async (post) => {
        post.images.forEach(async (image) => {
          const directory = `${__dirname}/../../uploads/post_images/${image}`;
          const fileExists = await checkFileExists(directory);
          if (fileExists) {
            rimraf(directory, (error) => {
              if (error) return res.status(500).send('Server error...');
            });
          }
        });

        await post.remove();
      });

      // Delete user
      await User.findByIdAndDelete(req.user.id);

      return res.json({ msg: 'User deleted' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

const checkFileExists = async (file) => {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

module.exports = router;
