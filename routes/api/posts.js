const express = require('express')
const router = express.Router()
const passport = require('passport')
const upload = require('../../middleware/upload')
const mongoose = require('mongoose')

const Post = require('../../models/Post')

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
  [passport.authenticate('jwt', { session: false }), upload.array('photo')],
  async (req, res) => {
    const { city, address, rooms, sqm, description, price } = req.body

    try {
      // Build post object
      const postFields = {}
      postFields.generalInfo = {}
      postFields.estate = {}
      postFields.priceInfo = {}
      postFields.photos = []

      postFields.user = req.user.id
      fillObjectFields(postFields, { description })
      fillObjectFields(postFields.generalInfo, { city, address })
      fillObjectFields(postFields.estate, { rooms, sqm })
      fillObjectFields(postFields.priceInfo, { price })

      // Post photos
      req.files.map(file => postFields.photos.push(file.id))

      const post = new Post(postFields)
      await post.save()

      res.json(post)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

const fillObjectFields = (object, fields) => {
  Object.keys(fields).map(key => {
    if (fields[key]) object[key] = fields[key]
  })
}

module.exports = router
