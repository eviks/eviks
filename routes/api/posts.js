const fs = require('fs')
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const passport = require('passport')
const uuid = require('uuid')
const sharp = require('sharp')
const rimraf = require('rimraf')
const postSearch = require('../../middleware/postSearch')

const Post = require('../../models/Post')
const Counter = require('../../models/Counter')

// @route GET api/posts
// @desc  Get all posts
// @access Public
router.get('/', [postSearch], async (req, res) => {
  let posts = {}
  let result = []

  const {
    conditions,
    paginatedResults: { pagination, limit, startIndex },
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

// @route GET api/posts/post/:id
// @desc  Get single post
// @access Public
router.get('/post/:id', async (req, res) => {
  const postId = req.params.id

  try {
    const post = await Post.findById(postId)

    // Post not found
    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] })
    }

    return res.json(post)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send('Server error...')
  }
})

// @route POST api/posts
// @desc  Create post
// @access Private
router.post(
  '/',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = new Post({
        user,
        ...req.body,
      })
      post._id = await getNextSequence('postid')
      await post.save()

      // Move post images from temp to main folder
      for (let image of req.body.images) {
        try {
          await fs.promises.rename(
            `${__dirname}/../../uploads/temp/post_images/${image}`,
            `${__dirname}/../../uploads/post_images/${image}`,
          )
        } catch (error) {
          console.error(error.message)
          return res.status(500).send('Server error...')
        }
      }

      res.json(post)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  },
)

// @route PUT api/posts
// @desc  Update post
// @access Private
router.put(
  '/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const postId = req.params.id

    try {
      const post = await Post.findById(postId)

      // Post not found
      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] })
      }

      // Check user
      if (req.user.id !== post.user.toString()) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'User not authorized' }] })
      }

      // Update images
      for (let image of req.body.images) {
        if (!post.images.find((value) => value === image)) {
          try {
            await fs.promises.rename(
              `${__dirname}/../../uploads/temp/post_images/${image}`,
              `${__dirname}/../../uploads/post_images/${image}`,
            )
          } catch (error) {
            console.error(error.message)
            return res.status(500).send('Server error...')
          }
        }
      }

      post.images.forEach(async (image) => {
        if (!req.body.images.find((value) => value === image)) {
          const directory = `${__dirname}/../../uploads/post_images/${image}`
          const fileExists = await checkFileExists(directory)
          if (fileExists) {
            rimraf(directory, (error) => {
              if (error) return res.status(500).send('Server error...')
            })
          }
        }
      })

      // Update post itself
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { ...req.body },
        { new: true },
      )

      res.json(updatedPost)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  },
)

// @route DELETE api/posts
// @desc  Delete post
// @access Private
router.delete(
  '/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const postId = req.params.id

    try {
      const post = await Post.findById(postId)

      // Post not found
      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] })
      }

      // Check user
      if (req.user.id !== post.user.toString()) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'User not authorized' }] })
      }

      // Delete post images first
      post.images.forEach(async (image) => {
        const directory = `${__dirname}/../../uploads/post_images/${image}`
        const fileExists = await checkFileExists(directory)
        if (fileExists) {
          rimraf(directory, (error) => {
            if (error) return res.status(500).send('Server error...')
          })
        }
      })

      // Delete post
      await post.remove()

      return res.json({ msg: 'Post deleted' })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  },
)

// @route GET api/posts/generate_upload_id
// @desc  Generates unique id for new uploading image
// @access Private
router.get(
  '/generate_upload_id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    // Generate unique id
    let id = uuid.v4()
    const tempDirectory = `${__dirname}/../../uploads/temp/post_images/${id}`
    const mainDirectory = `${__dirname}/../../uploads/post_images/${id}`
    while (
      (await checkFileExists(tempDirectory)) ||
      (await checkFileExists(mainDirectory))
    ) {
      id = uuid.v4()
    }

    // Create new temp directory, where all image size versions will be stored
    try {
      await fs.promises.mkdir(tempDirectory)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }

    res.json({ id })
  },
)

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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    // Check if file is passed
    if (req.files === null) {
      return res.status(400).json({ errors: [{ msg: 'No file uploaded' }] })
    }

    const image = req.files.image
    const id = req.body.id
    const directory = `${__dirname}/../../uploads/temp/post_images/${id}`

    // Check if id is correct
    const fileExists = await checkFileExists(directory)
    const files = fileExists ? await fs.promises.readdir(directory) : []
    if (!fileExists || files.length !== 0) {
      return res.status(400).json({ errors: [{ msg: 'Invalid ID' }] })
    }

    // Generate different image sizes (1280px, 640px, 320px, 160px)
    const imageSizes = [1280, 640, 320, 160]

    let serverError = false
    imageSizes.forEach(async (size) => {
      try {
        await sharp(image.data)
          .resize(size)
          .png()
          .toFile(`${directory}/image_${size}.png`)
      } catch (error) {
        console.log(error)
        serverError = true
      }
    })

    if (!serverError) {
      res.json({ msg: 'Image successfully uploaded', id })
    } else {
      rimraf(directory, (error) => {
        if (error) return res.status(500).send('Server error...')
      })
      res.status(500).send('Server error...')
    }
  },
)

// @route DELETE api/posts/delete_image/:id
// @desc  Delete image (only available for temp files)
// @access Private
router.delete(
  '/delete_image/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    id = req.params.id

    const directory = `${__dirname}/../../uploads/temp/post_images/${id}`

    // Check if id is correct
    if (!(await checkFileExists(directory))) {
      return res.status(400).json({ errors: [{ msg: 'Invalid ID' }] })
    }

    // Delete folder with all image sizes
    rimraf(directory, (error) => {
      if (error) return res.status(500).send('Server error...')
    })

    res.json({ msg: 'Image successfully deleted', id })
  },
)

const checkFileExists = async (file) => {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

const getNextSequence = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      )
      resolve(counter.seq)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = router
