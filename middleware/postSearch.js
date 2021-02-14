const mongoose = require('mongoose')

const Post = require('../models/Post')

const postSearch = async (req, res, next) => {
  // userId validation
  const userId = req.params.userId
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ errors: [{ msg: 'User not found' }] })
  }

  // Set filters
  req.conditions = setPostsFilters(req)

  // Pagination
  req.paginatedResults = await getPaginatedResults(req)

  next()
}

const setPostsFilters = req => {
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
  } = req.query

  const conditions = {}

  // Find specific user's posts
  const userId = req.params.id
  if (userId) conditions.user = userId

  // City
  if (cityId) conditions['city.id'] = cityId

  // Location IDs
  if (locationIds) {
    const locationConditions = locationIds.split(',')
    conditions.$or = [
      { 'district.id': { $in: locationConditions } },
      { 'subdistrict.id': { $in: locationConditions } }
    ]
  }

  // Deal type
  if (dealType) conditions.dealType = dealType

  // Price
  setMinMaxFilter(conditions, 'price', priceMin, priceMax)

  // Rooms
  setMinMaxFilter(conditions, 'rooms', roomsMin, roomsMax)

  // Estate type
  if (estateType) conditions.estateType = estateType

  // Estate type
  if (apartmentType) conditions.apartmentType = apartmentType

  // Sqm
  setMinMaxFilter(conditions, 'sqm', sqmMin, sqmMax)
  setMinMaxFilter(conditions, 'livingRoomsSqm', livingSqmMin, livingSqmMax)
  setMinMaxFilter(conditions, 'kitchenSqm', kitchenSqmMin, kitchenSqmMax)

  // Floor
  setMinMaxFilter(conditions, 'totalFloors', totalFloorMin, totalFloorMax)
  setMinMaxFilter(conditions, 'floor', floorMin, floorMax)

  // Documented
  if (documented) conditions.documented = true

  // Mortgage
  if (mortgage) conditions.mortgage = true

  // Redevelopment
  if (redevelopment) conditions.redevelopment = true

  // Bargain
  if (bargain) conditions.bargain = true

  // Not first floor
  if (notFirstFloor) conditions.notFirstFloor = { $ne: 1 }

  // Not last floor
  if (notLastFloor) conditions.$expr = { $ne: ['$floor', '$totalFloors'] }

  return conditions
}

const setMinMaxFilter = (conditions, name, min, max) => {
  if (min && max) {
    conditions[name] = { $gte: min, $lte: max }
  } else if (min) {
    conditions[name] = { $gte: min }
  } else if (max) {
    conditions[name] = { $lte: max }
  }
}

const getPaginatedResults = (req, conditions) => {
  return new Promise(async (resolve, reject) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    if (!page || !limit) resolve({})

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let numberOfElements
    try {
      numberOfElements = await Post.find(conditions)
        .countDocuments()
        .exec()
    } catch (error) {
      reject(error.message)
    }

    const pagination = {}

    if (endIndex < numberOfElements) {
      pagination.total = Math.ceil(numberOfElements / limit)
    }

    if (startIndex > 0) {
      pagination.skipped = Math.ceil(startIndex / limit)
    }

    pagination.current = page

    resolve({ pagination, limit, startIndex })
  })
}

module.exports = postSearch
