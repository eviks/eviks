const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../../middleware/upload')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

const Post = require('../../models/Post')

// @route GET api/posts
// @desc  Get all posts
// @acess Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error...')
  }
})

// @route GET api/posts/:id
// @desc  Get post info
// @acess Public
router.get('/:id', async (req, res) => {
  postId = req.params.id

  // Id validation
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ errors: [{ message: 'Post not found' }] })
  }

  const post = await Post.findById(postId)

  // Post not found
  if (!post) {
    return res.status(404).json({ errors: [{ message: 'Post not found' }] })
  }

  return res.json(post)
})

// @route POST api/posts
// @desc  Create post
// @acess Private
router.post(
  '/',
  [passport.authenticate('jwt', { session: false }), upload.array('photos')],
  async (req, res) => {
    try {
      const postFields = { ...req.body }
      postFields.photos = []

      // Post photos
      postFields.user = req.user
      req.files.map(file =>
        postFields.photos.push(mongoose.Types.ObjectId(file.id))
      )

      const post = new Post(postFields)
      await post.save()

      res.json(post)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route POST api/posts/photo
// @desc  Upload photo
// @acess Private
router.post(
  '/photo',
  [passport.authenticate('jwt', { session: false }), upload.single('photo')],
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Photo not uploaded' }] })
      }
      res.json({ id: req.file.id })
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route GET api/posts/photo
// @desc  Get post photos
// @acess Public
router.get('/photo/:id', async (req, res) => {
  Grid.mongo = mongoose.mongo
  let gfs = new Grid(mongoose.connection.db)
  gfs.collection('uploads')

  const postId = req.params.id
  const post = await Post.findById(postId)

  gfs.files
    .find({
      _id: { $in: post.photos.map(photo => mongoose.Types.ObjectId(photo._id)) }
    })
    .toArray((error, files) => {
      // Check if no files
      if (!files || files.length === 0) {
        return res
          .status(404)
          .json({ errors: [{ message: 'No photos found' }] })
      }

      res.json(files)
    })
})

// @route GET api/posts/photo/single/:filename
// @desc  Get post photo by its name
// @acess Public
router.get('/photo/single/:filename', (req, res) => {
  Grid.mongo = mongoose.mongo
  let gfs = new Grid(mongoose.connection.db)
  gfs.collection('uploads')

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if no files
    if (!file) {
      return res.status(404).json({ errors: [{ message: 'No photos found' }] })
    }

    // Read output to browser
    const readstream = gfs.createReadStream(file.filename)
    readstream.pipe(res)
  })
})

module.exports = router
