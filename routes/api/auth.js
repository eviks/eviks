const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require('passport');
const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');
const emailSender = require('../../config/mailer/emailSender');
const logger = require('../../utils/logger');

const User = require('../../models/User');

const router = express.Router();

// @route GET api/auth
// @desc  Get user info via token
// @access Public
router.get('/', async (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      logger.error(err.message);
      return res.status(500).send('Server error...');
    }
    if (info) {
      return res.status(400).json({ errors: [info] });
    }
    return res.json(user);
  })(req, res, next);
});

// @route POST api/auth
// @desc  Authenticate user & get user
// @access Public
router.post(
  '/',
  [
    check('email', 'Email address is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    return passport.authenticate('local-signin', (err, user, info) => {
      if (err) {
        logger.error(err.message);
        return res.status(500).send('Server error...');
      }
      if (info) {
        return res.status(400).json({ errors: [info] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, config.get('jwtSecret'));
      return res.json({ token });
    })(req, res, next);
  },
);

// @route GET api/auth/google
// @desc  Authenticate with Google
// @access Public
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// @route POST api/auth/login_with_google
// @desc  Authenticate user with Google credentials (used for mobile apps). Credentials are retrieved from Firebase.
// @access Public
router.post(
  '/login_with_google',
  [
    check('displayName', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('googleId', 'Google ID is required').notEmpty(),
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { displayName, email, googleId, picture } = req.body;

    try {
      // If there is a user with such Google ID then just sign in.
      let user = await User.findOne({ googleId });
      if (user) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(payload, config.get('jwtSecret'));
        return res.json({ token });
      }

      // Notify if email is already in use.
      user = await User.findOne({
        email: email.toLowerCase(),
      });
      if (user && user.active) {
        return res.status(400).json({
          errors: [
            {
              param: 'email',
              msg: 'This email is already taken',
            },
          ],
        });
      }

      // Create new user
      user = new User({
        displayName,
        email: email.toLowerCase(),
        active: true,
        googleId,
        activationToken: undefined,
        activationTokenExpires: undefined,
        picture: picture !== null ? picture : null,
      });
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, config.get('jwtSecret'));
      return res.json({ token });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route GET api/auth/google/callback
// @desc  Google auth callback
// @access Public
router.get('/google/callback', (req, res, next) => {
  return passport.authenticate('google', (err, user, info) => {
    if (err) {
      logger.error(err.message);
      return res.status(500).send('Server error...');
    }
    if (info && Object.keys(info).length > 0) {
      return res.status(400).json({ errors: [info] });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, config.get('jwtSecret'));
    return res.redirect(`/user_load?token=${token}`);
  })(req, res, next);
});

// @route POST api/auth/verification/
// @desc  Email verification
// @access Public
router.post('/verification', async (req, res) => {
  try {
    const { email, activationToken } = req.body;

    // Find user by activation token
    const user = await User.findOne({
      email: email.toLowerCase(),
      active: false,
      activationToken,
      activationTokenExpires: {
        $gt: Date.now(),
      },
    });

    // User not found
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid activation token' }],
      });
    }

    // Update user
    user.active = true;
    user.activationToken = undefined;
    user.activationTokenExpires = undefined;
    await user.save();

    // Login user
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, config.get('jwtSecret'));
    return res.json({ token });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send('Server error...');
  }
});

// @route POST api/auth/create_reset_password_token
// @desc  Create reset password token
// @access Public
router.post(
  '/create_reset_password_token',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    try {
      // Find user by email address
      const user = await User.findOne({
        email: email.toLowerCase(),
      });

      // User not found
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'No account with that email address exist' }],
        });
      }

      // Check if it's a Google user
      if (!user.password) {
        return res.status(400).json({
          errors: [
            { msg: 'There is already a Google account that belongs to you' },
          ],
        });
      }

      // Generate unique reset password token
      let resetPasswordToken = '';
      let tokenIsUnique = false;

      while (!tokenIsUnique) {
        resetPasswordToken = randomstring.generate({
          length: 5,
          charset: 'numeric',
        });
        // eslint-disable-next-line no-await-in-loop
        const userWithSameToken = await User.findOne({ resetPasswordToken });
        tokenIsUnique = !userWithSameToken;
      }
      const resetPasswordTokenExpires = Date.now() + 180000;

      // Update user
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpires = resetPasswordTokenExpires;
      await user.save();

      // Send password reset email
      const result = await emailSender({
        emailType: 'reset-password',
        subject: 'Parolun bərpası',
        receivers: email,
        context: {
          resetPasswordToken,
        },
      });

      if (!result.success) throw result.error;

      return res.send('Reset password email sent');
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route POST api/auth/check_reset_password_token
// @desc  Check reset password token
// @access Public
router.post(
  '/check_reset_password_token',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('resetPasswordToken', 'Reset password token is required').exists(),
  ],
  async (req, res) => {
    const { email, resetPasswordToken } = req.body;

    try {
      // Find user by reset password token
      const user = await User.findOne({
        email: email.toLowerCase(),
        resetPasswordToken,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      });

      // User not found
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid reset password token' }],
        });
      }

      return res.send('Reset-password-token is valid');
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route POST api/auth/reset_password
// @desc  Resets users password
// @access Public
router.post(
  '/reset_password',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('resetPasswordToken', 'Reset password token is required').exists(),
    check('password', 'Password is required').exists(),
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
      const { email, resetPasswordToken, password } = req.body;

      // Find user by reset password token
      const user = await User.findOne({
        email: email.toLowerCase(),
        resetPasswordToken,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      });

      // User not found
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid reset password token' }],
        });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update user
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      // Login user
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, config.get('jwtSecret'));
      return res.json({ token });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

module.exports = router;
