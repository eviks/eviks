const fs = require('fs');
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const rimraf = require('rimraf');
const logger = require('../../utils/logger');

const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

const checkFileExists = async (file) => {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    return passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        logger.error(err.message);
        return res.status(500).send('Server error...');
      }
      if (info) {
        return res.status(400).json({ errors: info });
      }

      return res.json({ message: 'User created' });
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
      check(
        'newPassword',
        'Password must be at least 6 characters long',
      ).isLength({
        min: 6,
      }),
      check('newPassword', '...').isEmpty(),
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
      const updateQuery = {};
      updateQuery.displayName = req.body.displayName;

      if (req.body.newPassword) {
        // Check previous password
        const { password } = req.body;
        if (!password) {
          return res
            .status(401)
            .json({ errors: [{ msg: 'Previous password is required' }] });
        }
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(401)
            .json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // Encrypt new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        updateQuery.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateQuery,
        { new: true },
      ).select('-password');
      return res.json(updatedUser);
    } catch (error) {
      logger.error(error.message);
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

      return res.json({ favorites: user.favorites });
    } catch (error) {
      logger.error(error.message);
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

      const { favorites } = user;

      const filtered = Object.keys(favorites)
        .filter((key) => {
          return key !== req.params.postId;
        })
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: favorites[key],
          };
        }, {});

      user.favorites = filtered;
      await user.save();

      return res.json({ favorites: user.favorites });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  POST api/users/:id
// @desc   Get user info
// @access Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, { displayName: 1, createdAt: 1 });

    // User not found
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }

    return res.json(user);
  } catch (error) {
    logger.error(error.message);
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

      let imagesDeleted = true;

      posts.forEach(async (post) => {
        post.images.forEach(async (image) => {
          const directory = `${__dirname}/../../../uploads/post_images/${image}`;
          const fileExists = await checkFileExists(directory);
          if (fileExists) {
            rimraf(directory, (error) => {
              if (error) imagesDeleted = false;
            });
          }
        });

        if (imagesDeleted) {
          await post.remove();
        }
      });

      if (!imagesDeleted) return res.status(500).send('Server error...');

      // Delete user
      await User.findByIdAndDelete(req.user.id);

      return res.json({ msg: 'User deleted' });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

module.exports = router;
