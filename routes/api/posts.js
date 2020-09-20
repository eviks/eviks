const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const Busboy = require('busboy')
const busboyBodyParser = require('busboy-body-parser')
const AWS = require('aws-sdk')
const sharp = require('sharp')
const crypto = require('crypto')
const path = require('path')
const config = require('config')

const { accessKeyId, secretAccessKey, Bucket } = config.get('AWS')

const Post = require('../../models/Post')

const setMinMaxFilter = (selectedFilters, name, min, max) => {
  if (min && max) {
    selectedFilters[name] = { $gte: min, $lte: max }
  } else if (min) {
    selectedFilters[name] = { $gte: min }
  } else if (max) {
    selectedFilters[name] = { $lte: max }
  }
}

// @route GET api/posts
// @desc  Get all posts
// @access Public
router.get('/', async (req, res) => {
  const filters = req.query

  try {
    let posts = {}
    let result = []
    let pagination = {}
    let selectedFilters = {}

    // Set filters
    setPostsFilters(filters, selectedFilters)

    // Pagination
    const { limit, startIndex } = await getPaginatedResults(
      req,
      pagination,
      selectedFilters
    )

    result = await Post.find(selectedFilters)
      .limit(limit)
      .skip(startIndex)
      .sort({ date: -1 })

    posts.result = result
    posts.pagination = pagination

    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error...')
  }
})

const setPostsFilters = (filters, selectedFilters) => {
  const {
    cityId,
    dealType,
    priceMin,
    priceMax,
    roomsMin,
    roomsMax,
    estateType,
    apartmentType,
    sqmMin,
    sqmMax,
    livingSqmMin,
    livingSqmMax,
    kitchenSqmMin,
    kitchenSqmMax,
    totalFloorMin,
    totalFloorMax,
    floorMin,
    floorMax,
    documented,
    mortgage,
    redevelopment,
    bargain,
    notFirstFloor,
    notLastFloor
  } = filters

  // City
  if (cityId) selectedFilters['city.id'] = cityId

  // Deal type
  if (dealType) selectedFilters.dealType = dealType

  // Price
  setMinMaxFilter(selectedFilters, 'price', priceMin, priceMax)

  // Rooms
  setMinMaxFilter(selectedFilters, 'rooms', roomsMin, roomsMax)

  // Estate type
  if (estateType) selectedFilters.estateType = estateType

  // Estate type
  if (apartmentType) selectedFilters.apartmentType = apartmentType

  // Sqm
  setMinMaxFilter(selectedFilters, 'sqm', sqmMin, sqmMax)
  setMinMaxFilter(selectedFilters, 'livingRoomsSqm', livingSqmMin, livingSqmMax)
  setMinMaxFilter(selectedFilters, 'kitchenSqm', kitchenSqmMin, kitchenSqmMax)

  // Floor
  setMinMaxFilter(selectedFilters, 'totalFloors', totalFloorMin, totalFloorMax)
  setMinMaxFilter(selectedFilters, 'floor', floorMin, floorMax)

  // Documented
  if (documented) selectedFilters.documented = true

  // Mortgage
  if (mortgage) selectedFilters.mortgage = true

  // Redevelopment
  if (redevelopment) selectedFilters.redevelopment = true

  // Bargain
  if (bargain) selectedFilters.bargain = true

  // Not first floor
  if (notFirstFloor) selectedFilters.notFirstFloor = { $ne: 1 }

  // Not last floor
  if (notLastFloor) selectedFilters.$expr = { $ne: ['$floor', '$totalFloors'] }
}

const getPaginatedResults = (req, pagination, selectedFilters) => {
  return new Promise(async (resolve, reject) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    if (!page || !limit) resolve({})

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let numberOfElements
    try {
      numberOfElements = await Post.find(selectedFilters)
        .countDocuments()
        .exec()
    } catch (error) {
      reject(error.message)
    }

    if (endIndex < numberOfElements) {
      pagination.total = Math.ceil(numberOfElements / limit)
    }

    if (startIndex > 0) {
      pagination.skipped = Math.ceil(startIndex / limit)
    }

    pagination.current = page

    resolve({ limit, startIndex })
  })
}

// @route GET api/posts/post/:id
// @desc  Get single post
// @access Public
router.get('/post/:id', async (req, res) => {
  postId = req.params.id

  // Id validation
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ errors: [{ message: 'Post not found' }] })
  }

  try {
    const post = await Post.findById(postId)

    // Post not found
    if (!post) {
      return res.status(404).json({ errors: [{ message: 'Post not found' }] })
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
      const post = new Post({ ...req.body, user })
      await post.save()

      res.json(post)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route POST api/posts/upload_photo
// @desc  Upload photo
// @access Private
router.post(
  '/upload_photo',
  [
    passport.authenticate('jwt', { session: false }),
    busboyBodyParser({ limit: '10mb' })
  ],
  (req, res) => {
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('finish', async () => {
      const { name, data, mimetype } = req.files.photo

      try {
        const uploadFilePromises = []
        const filename = await hashFileName(name)
        const re = /WIDTH/

        const image = await sharp(data)
          .resize(1024)
          .toBuffer()

        const thumbnail = await sharp(data)
          .resize(480)
          .toBuffer()

        const imgName = filename.replace(re, '1024')
        const thumbName = filename.replace(re, '480')

        uploadFilePromises.push(uploadToS3(imgName, image, mimetype))

        uploadFilePromises.push(uploadToS3(thumbName, thumbnail, mimetype))

        const filesInfo = await Promise.all(uploadFilePromises)
        res.json({
          img: filesInfo[0].Location,
          thumb: filesInfo[1].Location,
          fileNames: [imgName, thumbName]
        })
      } catch (error) {
        console.error(error.message)
        return res.status(500).send('Server error...')
      }
    })

    req.pipe(busboy)
  }
)

// @route DELETE api/posts/delete_photo/:id
// @desc  Delete photo
// @access Private
router.delete(
  '/delete_photo/:id',
  [passport.authenticate('jwt', { session: false })],
  (req, res) => {
    try {
      filename = req.params.id
      deleteFromS3(filename, res)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

const hashFileName = filename => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, async (err, buff) => {
      if (err) {
        reject(err)
      }
      const hashedName =
        buff.toString('hex') + '_WIDTH' + path.extname(filename)
      resolve(hashedName)
    })
  })
}

const uploadToS3 = (filename, buffer, mimetype) => {
  const s3bucket = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    Bucket
  })

  const params = {
    Bucket,
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
    CacheControl: 'public, max-age=86400'
  }

  return s3bucket.upload(params).promise()
}

const deleteFromS3 = (filename, res) => {
  const s3bucket = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    Bucket
  })

  const params = {
    Bucket,
    Key: filename
  }

  return s3bucket.deleteObject(params, function(error, data) {
    if (error) res.status(500).send('Server error...')
    return res.send('Photo deleted')
  })
}

module.exports = router
