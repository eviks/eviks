const fs = require('fs');
const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const uuid = require('uuid');
const sharp = require('sharp');
const rimraf = require('rimraf');
const postSearch = require('../../middleware/postSearch');
const logger = require('../../utils/logger');

const basePostSchema = require('../../models/basePostSchema');
const Post = require('../../models/Post');
const UnreviwedPost = require('../../models/UnreviewedPost');
const User = require('../../models/User');
const Counter = require('../../models/Counter');

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

const getNextSequence = async (name) => {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return counter.seq;
};

// @route GET api/posts
// @desc  Get posts
// @access Public
router.get('/', [postSearch], async (req, res) => {
  const posts = {};
  let result = [];

  const {
    conditions,
    paginatedResults: { pagination, limit, startIndex },
  } = req;

  try {
    result = await Post.find(conditions)
      .limit(limit)
      .skip(startIndex)
      .sort({ updatedAt: -1 })
      .select('-phoneNumber');

    posts.result = result;
    posts.pagination = pagination;

    res.json(posts);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send('Server error...');
  }
});

// @route GET api/posts
// @desc  Get unreviewed posts
// @access Private
router.get(
  '/unreviewed_posts',
  [passport.authenticate('jwt', { session: false }), postSearch],
  async (req, res) => {
    const posts = {};
    let result = [];

    const {
      conditions,
      paginatedResults: { pagination, limit, startIndex },
    } = req;

    try {
      result = await UnreviwedPost.find(conditions)
        .limit(limit)
        .skip(startIndex)
        .sort({ updatedAt: -1 })
        .select('-phoneNumber');

      posts.result = result;
      posts.pagination = pagination;

      res.json(posts);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send('Server error...');
    }
  },
);

// @route GET api/posts/:id
// @desc  Get single post
// @access Public
router.get('/post/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).select('-phoneNumber');

    // Post not found
    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    return res.json(post);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send('Server error...');
  }
});

// @route GET api/posts/:id
// @desc  Get single unreviewed post
// @access Private
router.get(
  '/unreviewed_post/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const { id } = req.params;

    try {
      const post = await UnreviwedPost.findById(id).select('-phoneNumber');

      // Post not found
      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      // Check user
      if (req.user.role === 'user' && req.user.id !== post.user.toString()) {
        return res.status(401).json({ errors: [{ msg: 'Permission denied' }] });
      }

      return res.json(post);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route POST api/posts
// @desc  Create post
// @access Private
router.post(
  '/',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = new UnreviwedPost({
        ...req.body,
        user,
      });
      // eslint-disable-next-line no-underscore-dangle
      post._id = await getNextSequence('postid');
      await post.save();

      return res.json(post);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route POST api/posts/confirm/:id
// @desc  Confirm post. Unreviewed version of post is replaced by a standart post
// @access Private
router.post(
  '/confirm/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    if (!req.user.role !== 'moderator') {
      return res.status(401).json({ errors: [{ msg: 'Permission denied' }] });
    }

    const postId = req.params.id;

    try {
      const unreviewedPost = await UnreviwedPost.findById(postId).select(
        Object.keys(basePostSchema).join(','),
      );

      // Unreviewed post not found
      if (!unreviewedPost) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      // Create / update standart post
      let post;
      const doc = {
        ...unreviewedPost,
        status: 'confirmed',
      };

      if (!unreviewedPost.rereview) {
        // Create new standart post
        post = new Post(doc);
        await post.save();
      } else {
        // Delete all previous images first
        let imagesDeleted = true;
        post.images.forEach(async (image) => {
          const directory = `${__dirname}/../uploads/post_images/${image}`;
          const fileExists = await checkFileExists(directory);
          if (fileExists) {
            rimraf(directory, (error) => {
              if (error) imagesDeleted = false;
            });
          }
        });

        if (!imagesDeleted) {
          return res.status(500).send('Server error...');
        }

        // Update existing standart post
        post = await Post.findByIdAndUpdate(postId, doc, { new: true });
      }

      // Move all post images from temp to main folder
      await req.body.images.map(async (image) => {
        await fs.promises.rename(
          `${__dirname}/../../uploads/temp/post_images/${image}`,
          `${__dirname}/../../uploads/post_images/${image}`,
        );
      });

      // Delete unreviewed version
      await unreviewedPost.remove();

      return res.json(post);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route PUT api/posts/:id
// @desc  Update post
// @access Private
router.put(
  '/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const postId = req.params.id;

    try {
      const post = await Post.findById(postId);

      // Post not found
      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      // Check user
      if (req.user.id !== post.user.toString()) {
        return res.status(401).json({ errors: [{ msg: 'Permission denied' }] });
      }

      // Copy existing images to the temp folder
      await req.body.images.map(async (image) => {
        if (
          post.images.find((value) => {
            return value === image;
          })
        ) {
          await fs.promises.copyFile(
            `${__dirname}/../../uploads/post_images/${image}`,
            `${__dirname}/../../uploads/temp/post_images/${image}`,
          );
        }
      });

      // Create unreviewed post version
      const unreviewedPost = new UnreviwedPost({ ...req.body, rereview: true });
      await unreviewedPost.save();

      // Update post status
      await Post.findByIdAndUpdate(postId, { status: 'onreview' });

      return res.json(unreviewedPost);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route DELETE api/posts/:id
// @desc  Delete post
// @access Private
router.delete(
  '/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const postId = req.params.id;

    try {
      const post = await Post.findById(postId);

      // Post not found
      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      // Check user
      if (req.user.id !== post.user.toString()) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'User not authorized' }] });
      }

      // Delete post images first
      let imagesDeleted = true;
      post.images.forEach(async (image) => {
        const directory = `${__dirname}/../../uploads/post_images/${image}`;
        const fileExists = await checkFileExists(directory);
        if (fileExists) {
          rimraf(directory, (error) => {
            if (error) imagesDeleted = false;
          });
        }
      });

      if (!imagesDeleted) {
        return res.status(500).send('Server error...');
      }

      // Delete post
      await post.remove();

      return res.json({ msg: 'Post deleted' });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route GET api/posts/generate_upload_id
// @desc  Generates unique id for new uploading image
// @access Private
router.get(
  '/generate_upload_id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    // Generate unique id
    const id = uuid.v4();
    const tempDirectory = `${__dirname}/../../uploads/temp/post_images/${id}`;

    // Create new temp directory, where all image size versions will be stored
    try {
      await fs.promises.mkdir(tempDirectory);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }

    return res.json({ id });
  },
);

// @route POST api/posts/upload_image
// @desc  Upload image
// @access Private
router.post(
  '/upload_image',
  [
    check('id', 'ID is required').exists(),
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

    // Check if file is passed
    if (req.files === null) {
      return res.status(400).json({ errors: [{ msg: 'No file uploaded' }] });
    }

    const { image } = req.files;
    const { id } = req.body;
    const directory = `${__dirname}/../../uploads/temp/post_images/${id}`;

    // Check if id is correct
    const fileExists = await checkFileExists(directory);
    const files = fileExists ? await fs.promises.readdir(directory) : [];
    if (!fileExists || files.length !== 0) {
      return res.status(400).json({ errors: [{ msg: 'Invalid ID' }] });
    }

    // Generate different image sizes (1280px, 640px, 320px, 160px)
    const imageSizes = [1280, 640, 320, 160];

    let serverError = false;

    await Promise.all(
      imageSizes.map(async (size) => {
        try {
          await sharp(image.data)
            .resize(size)
            .webp()
            .toFile(`${directory}/image_${size}.webp`);
        } catch (error) {
          logger.error(error);
          serverError = true;
        }
      }),
    );

    if (!serverError) {
      return res.json({ msg: 'Image successfully uploaded', id });
    }

    rimraf(directory);

    return res.status(500).send('Server error...');
  },
);

// @route DELETE api/posts/delete_image/:id
// @desc  Delete image (only available for temp files)
// @access Private
router.delete(
  '/delete_image/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const { id } = req.params;

    const directory = `${__dirname}/../../uploads/temp/post_images/${id}`;

    // Check if id is correct
    if (!(await checkFileExists(directory))) {
      return res.status(400).json({ errors: [{ msg: 'Invalid ID' }] });
    }

    // Delete folder with all image sizes
    let result = true;
    rimraf(directory, (error) => {
      if (error) result = false;
    });

    if (!result) {
      return res.status(500).send('Server error...');
    }

    return res.json({ msg: 'Image successfully deleted', id });
  },
);

// @route GET api/posts/phone_number/:id
// @desc  Get post's phone number field
// @access Public
router.get('/phone_number/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).select('phoneNumber');

    // Post not found
    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    return res.json(post);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send('Server error...');
  }
});

module.exports = router;
