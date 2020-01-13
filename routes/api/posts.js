const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');

// @route GET api/posts
// @desc  Posts route
// @acess Public
router.get('/', (req, res) => res.send('Posts route...'));

// @route POST api/posts
// @desc  Create post
// @acess Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { city, address, rooms, sqm, description, price } = req.body;

    try {
      // Build post object
      const postFields = {};
      postFields.generalInfo = {};
      postFields.estate = {};
      postFields.priceInfo = {};

      postFields.user = req.user.id;
      fillObjectFields(postFields, { description });
      fillObjectFields(postFields.generalInfo, { city, address });
      fillObjectFields(postFields.estate, { rooms, sqm });
      fillObjectFields(postFields.priceInfo, { price });

      const post = new Post(postFields);
      await post.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error...');
    }
  }
);

const fillObjectFields = (object, fields) => {
  Object.keys(fields).map(key => {
    if (fields[key]) object[key] = fields[key];
  });
};

module.exports = router;
