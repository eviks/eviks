const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');
const extractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const randomstring = require('randomstring');
const emailSender = require('../config/mailer/emailSender');

const User = require('../models/User');

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { pinMode, displayName } = req.body;

        // Check if user already exists
        let user = await User.findOne({
          email: new RegExp(['^', email, '$'].join(''), 'i'),
        });
        if (user && user.active) {
          return done(null, null, [
            {
              param: 'email',
              msg: 'This email is already taken',
            },
          ]);
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate unique activation token
        let activationToken = '';
        let tokenIsUnique = false;

        while (!tokenIsUnique) {
          if (pinMode) {
            activationToken = randomstring.generate({
              length: 5,
              charset: 'numeric',
            });
          } else {
            activationToken = randomstring.generate();
          }
          // eslint-disable-next-line no-await-in-loop
          const userWithSameToken = await User.findOne({ activationToken });
          tokenIsUnique = !userWithSameToken;
        }
        const activationTokenExpires =
          Date.now() + (pinMode ? +180000 : 10800000);

        if (user) {
          user.displayName = displayName;
          user.password = hashedPassword;
          user.activationToken = activationToken;
          user.activationTokenExpires = activationTokenExpires;
        } else {
          user = new User({
            displayName: req.body.displayName,
            email,
            password: hashedPassword,
            activationToken,
            activationTokenExpires,
          });
        }

        // Save user
        await user.save();

        // Send verification email
        const result = await emailSender({
          emailType: pinMode ? 'pin-mode-verification' : 'verification',
          subject: 'Email Verification',
          receivers: email,
          context: {
            activationToken,
          },
        });

        if (!result.success) throw result.error;

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  'local-signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Check if user exist
        const user = await User.findOne({
          email: new RegExp(['^', email, '$'].join(''), 'i'),
        });
        if (!user) {
          return done(null, null, {
            msg: 'Invalid credentials',
          });
        }

        // Check password
        if (!user.password) {
          return done(null, null, {
            msg: 'There is already a Google account that belongs to you',
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, null, {
            msg: 'Invalid credentials',
          });
        }

        // Check if user is activated
        if (!user.active) {
          return done(null, null, {
            msg: 'User email is not verified',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get('googleClientId'),
      clientSecret: config.get('googleClientSecret'),
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      try {
        // If there is a user with such Google ID then just sign in.
        let user = await User.findOne({ googleId: id });
        if (user) {
          return done(null, user);
        }

        // Notify if email is already in use.
        user = await User.findOne({
          email: new RegExp(['^', email, '$'].join(''), 'i'),
        });
        if (user && user.active) {
          return done(null, null, {
            param: 'email',
            msg: 'This email is already taken',
          });
        }

        // Create new user
        user = new User({
          displayName,
          email,
          active: true,
          googleId: id,
          activationToken: undefined,
          activationTokenExpires: undefined,
        });
        await user.save();

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: config.get('jwtSecret'),
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.user.id).select(
          '-password',
        );
        if (!user) {
          return done(null, null, {
            msg: 'Authorization denied',
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
