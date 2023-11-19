const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const logger = require('../../utils/logger');
const { setPostsFilters } = require('../../middleware/postSearch');

const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

// @route  POST api/subscriptions
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

      const { name, url, deviceToken } = req.body;

      // Check if name is unique
      if (
        user.subscriptions.find((element) => {
          return element.name === name;
        })
      ) {
        return res.status(401).json({
          errors: [{ msg: 'User already has subscription with such name' }],
        });
      }

      user.subscriptions.push({
        name,
        url,
        deviceToken,
      });

      // Update user devices
      if (deviceToken) {
        if (!user.devices) {
          user.devices = [deviceToken];
        } else if (
          !user.devices.find((e) => {
            return e === deviceToken;
          })
        ) {
          user.devices.push(deviceToken);
        }
      }

      await user.save();

      return res.json({ subscriptions: user.subscriptions });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  GET api/subscritions
// @desc   Get list of user's subscriptions
// @access Private
router.get(
  '/',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('subscriptions');

      const date = Date.now() - (86400 + 600) * 1000; // One day and 10 minutes ago

      const subscriptions = user.subscriptions ?? [];

      const result = await Promise.all(
        subscriptions.map(async (subscription) => {
          const query = Object.fromEntries(
            new URLSearchParams(subscription.url),
          );
          const conditions = setPostsFilters({ query });
          const numberOfElements = await Post.find(
            { ...conditions, createdAt: { $gt: date } },
            {},
          )
            .countDocuments()
            .exec();

          return { ...subscription.toJSON(), numberOfElements };
        }),
      );

      return res.json(result);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  PUT api/subscritions
// @desc   Update search params
// @access Private
router.put(
  '/',
  [
    check('id', 'ID is required').notEmpty(),
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

      const { id, name, url, deviceToken } = req.body;

      // Check if name is unique
      if (
        user.subscriptions.find((element) => {
          return element.name === name && element.id !== id;
        })
      ) {
        return res.status(401).json({
          errors: [{ msg: 'User already has subscription with such name' }],
        });
      }

      // Update subscription
      user.subscriptions = user.subscriptions.map((element) => {
        return element.id === id ? { name, url, deviceToken } : element;
      });

      // Update user devices
      if (deviceToken) {
        if (!user.devices) {
          user.devices = [deviceToken];
        } else if (
          !user.devices.find((e) => {
            return e === deviceToken;
          })
        ) {
          user.devices.push(deviceToken);
        }
      }

      await user.save();

      return res.json(user.subscriptions);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route  DELETE api/subscritions
// @desc   Delete user's subscriptions
// @access Private
router.delete(
  '/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('subscriptions');

      user.subscriptions = user.subscriptions.filter((element) => {
        return element.id !== req.params.id;
      });
      await user.save();

      return res.json({ subscriptions: user.subscriptions });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

module.exports = router;
