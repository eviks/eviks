const mongoose = require('mongoose');

const Post = require('../models/Post');

const postSearch = async (req, res, next) => {
  // userId validation
  const user = req.query.user;
  if (user && !mongoose.Types.ObjectId.isValid(user)) {
    return res.status(404).json({ errors: [{ msg: 'User not found' }] });
  }

  // Set filters
  req.conditions = setPostsFilters(req);

  // Pagination
  req.paginatedResults = await getPaginatedResults(req);

  next();
};

const setPostsFilters = (req) => {
  const {
    cityId,
    locationIds,
    districtId,
    subdistrictId,
    dealType,
    priceMin,
    priceMax,
    roomsMin,
    roomsMax,
    estateType,
    apartmentType,
    sqmMin,
    sqmMax,
    livingRoomsMin,
    livingRoomsMax,
    kitchenSqmMin,
    kitchenSqmMax,
    lotSqmMin,
    lotSqmMax,
    totalFloorsMin,
    totalFloorsMax,
    floorMin,
    floorMax,
    documented,
    mortgage,
    redevelopment,
    haggle,
    notFirstFloor,
    notLastFloor,
    user,
    ids,
  } = req.query;

  const conditions = {};

  // Find specific user's posts
  const userId = req.params.id;
  if (userId) conditions.user = userId;

  // City
  if (cityId) conditions['city.id'] = cityId;

  // Location IDs
  if (locationIds) {
    const locationConditions = locationIds.split(',');
    conditions.$or = [
      { 'district.id': { $in: locationConditions } },
      { 'subdistrict.id': { $in: locationConditions } },
    ];
  }

  // District & subdistrict
  if (districtId && subdistrictId) {
    conditions.$or = [
      { 'district.id': { $in: districtId.split(',') } },
      { 'subdistrict.id': { $in: subdistrictId.split(',') } },
    ];
  } else if (districtId) {
    conditions['district.id'] = { $in: districtId.split(',') };
  } else if (subdistrictId) {
    conditions['subdistrict.id'] = { $in: subdistrictId.split(',') };
  }

  // Deal type
  if (dealType) conditions.dealType = dealType;

  // Price
  setMinMaxFilter(conditions, 'price', priceMin, priceMax);

  // Rooms
  setMinMaxFilter(conditions, 'rooms', roomsMin, roomsMax);

  // Estate type
  if (estateType) conditions.estateType = estateType;

  // Estate type
  if (apartmentType) conditions.apartmentType = apartmentType;

  // Sqm
  setMinMaxFilter(conditions, 'sqm', sqmMin, sqmMax);
  setMinMaxFilter(conditions, 'livingRoomsSqm', livingRoomsMin, livingRoomsMax);
  setMinMaxFilter(conditions, 'kitchenSqm', kitchenSqmMin, kitchenSqmMax);
  setMinMaxFilter(conditions, 'lotSqm', lotSqmMin, lotSqmMax);

  // Floor
  setMinMaxFilter(conditions, 'totalFloors', totalFloorsMin, totalFloorsMax);
  setMinMaxFilter(conditions, 'floor', floorMin, floorMax);

  // Documented
  if (documented) conditions.documented = true;

  // Mortgage
  if (mortgage) conditions.mortgage = true;

  // Redevelopment
  if (redevelopment) conditions.redevelopment = true;

  // Haggle
  if (haggle) conditions.haggle = true;

  // Not first floor
  if (notFirstFloor) conditions.notFirstFloor = { $ne: 1 };

  // Not last floor
  if (notLastFloor) conditions.$expr = { $ne: ['$floor', '$totalFloors'] };

  // User
  if (user && mongoose.Types.ObjectId.isValid(user)) conditions.user = user;

  // Ids
  if (ids) conditions._id = { $in: ids.split(',') };

  return conditions;
};

const setMinMaxFilter = (conditions, name, min, max) => {
  if (min && max) {
    conditions[name] = { $gte: min, $lte: max };
  } else if (min) {
    conditions[name] = { $gte: min };
  } else if (max) {
    conditions[name] = { $lte: max };
  }
};

const getPaginatedResults = (req) => {
  return new Promise(async (resolve, reject) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (!page || !limit) resolve({});

    const startIndex = (page - 1) * limit;

    let numberOfElements;
    try {
      numberOfElements = await Post.find(req.conditions, {})
        .skip(startIndex)
        .limit(limit * 10)
        .countDocuments()
        .exec();
    } catch (error) {
      reject(error.message);
    }

    const pagination = {};

    pagination.available = page - 1 + Math.ceil(numberOfElements / limit);
    if (pagination.available === page || pagination.available === 0)
      delete pagination.available;

    if (startIndex > 0) {
      pagination.skipped = Math.ceil(startIndex / limit);
    }

    pagination.current = page;

    resolve({ pagination, limit, startIndex });
  });
};

module.exports = postSearch;
