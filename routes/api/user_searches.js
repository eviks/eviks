const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const randomstring = require('randomstring');
const logger = require('../../utils/logger');

const User = require('../../models/User');

const router = express.Router();

// @route  POST api/user_searches
// @desc   Save search params
// @access Private
router.post(
  '/',

  [
    check('name', 'Name is required').notEmpty(),
    check('url', 'URL is required').notEmpty(),
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
      const user = await User.findById(req.user.id);

      const { name, url } = req.body;

      // Check if name is unique
      if (
        user.savedSearches.find((element) => {
          return element.name === name;
        })
      ) {
        return res.status(401).json({
          errors: [{ msg: 'User already has saved search with such name' }],
        });
      }

      user.savedSearches.push({
        id: randomstring.generate(),
        name,
        url,
      });
      await user.save();

      return res.json({ savedSearches: user.savedSearches });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  GET api/user_searches
// @desc   Get list of user's saved searches
// @access Private
router.get(
  '/',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('savedSearches');
      return res.json({ savedSearches: user.savedSearches });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  PUT api/user_searches
// @desc   Update search params
// @access Private
router.put(
  '/',

  [
    check('id', 'Name is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('url', 'URL is required').notEmpty(),
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
      const user = await User.findById(req.user.id);

      const { id, name, url } = req.body;

      // Check if name is unique
      if (
        user.savedSearches.find((element) => {
          return element.name === name && element.id !== id;
        })
      ) {
        return res.status(401).json({
          errors: [{ msg: 'User already has saved search with such name' }],
        });
      }

      // Update saved search
      user.savedSearches = user.savedSearches.map((element) => {
        return element.id === id ? { id, name, url } : element;
      });

      await user.save();

      return res.json({ savedSearches: user.savedSearches });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  DELETE api/user_searches
// @desc   Delete user's saved searches
// @access Private
router.delete(
  '/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('savedSearches');

      user.savedSearches = user.savedSearches.filter((element) => {
        return element.id !== req.params.id;
      });
      await user.save();

      return res.json({ savedSearches: user.savedSearches });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

module.exports = router;
