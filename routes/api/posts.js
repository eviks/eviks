const fs = require('fs')
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const passport = require('passport')
const mongoose = require('mongoose')
const uuid = require('uuid')
const sharp = require('sharp')
const rimraf = require('rimraf')

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
    res.status(500).send('Server error...')
  }
})

const setPostsFilters = (filters, selectedFilters) => {
  const {
    cityId,
    locationIds,
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

  // Location IDs
  if (locationIds) {
    const locationIds = filters.locationIds.split(',')
    selectedFilters.$or = [
      { 'district.id': { $in: locationIds } },
      { 'subdistrict.id': { $in: locationIds } }
    ]
  }

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
    return res.status(404).json({ errors: [{ msg: 'Post not found' }] })
  }

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
      const post = new Post({ ...req.body, user })
      await post.save()

      res.json(post)
    } catch (error) {
      console.error(error.message)
      return res.status(500).send('Server error...')
    }
  }
)

// @route GET api/posts/generate_upload_id
// @desc  Generates unique id for new uploading image
// @access Private
router.get(
  '/generate_upload_id',
  [passport.authenticate('jwt', { session: false })],
  (req, res) => {
    // Generate unique id
    let id = uuid.v4()
    while (fs.existsSync(id)) {
      id = uuid.v4()
    }

    // Create new directory, where all image size versions will be stored
    const directory = `${__dirname}/../../uploads/temp/post_images/${id}`
    fs.mkdirSync(directory)

    res.json({ id })
  }
)

// @route POST api/posts/upload_image
// @desc  Upload image
// @access Private
router.post(
  '/upload_image',
  [
    check('id', 'ID is required').exists(),
    passport.authenticate('jwt', { session: false })
  ],
  async (req, res) => {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
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
    if (!fs.existsSync(__dirname) || fs.readdirSync(directory).length !== 0) {
      return res.status(400).json({ errors: [{ msg: 'Invalid ID' }] })
    }

    // Generate different image sizes (1280px, 640px, 320px, 160px)
    const imageSizes = [1280, 640, 320, 160]

    let serverError = false
    imageSizes.forEach(async size => {
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
      rimraf.sync(directory)
      res.status(500).send('Server error...')
    }
  }
)

// @route DELETE api/posts/delete_image/:id
// @desc  Delete image (only available for temp files)
// @access Private
router.delete(
  '/delete_image/:id',
  [passport.authenticate('jwt', { session: false })],
  (req, res) => {
    id = req.params.id

    const directory = `${__dirname}/../../uploads/temp/post_images/${id}`

    // Check if id is correct
    if (!fs.existsSync(__dirname)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid ID' }] })
    }

    // Delete folder with all image sizes
    rimraf.sync(directory)

    res.json({ msg: 'Image successfully deleted', id })
  }
)

module.exports = router
