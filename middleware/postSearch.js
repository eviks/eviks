const mongoose = require('mongoose');

const Post = require('../models/Post');

const setMinMaxFilter = (min, max) => {
  if (min && max) {
    return { $gte: min, $lte: max };
  }
  if (min) {
    return { $gte: min };
  }
  if (max) {
    return { $lte: max };
  }
  return null;
};

const getPaginatedResults = async (req) => {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);

  if (!page || !limit) return null;

  const startIndex = (page - 1) * limit;

  const numberOfElements = await Post.find(req.conditions, {})
    .skip(startIndex)
    .limit(limit * 10)
    .countDocuments()
    .exec();

  const pagination = {};

  pagination.available = page - 1 + Math.ceil(numberOfElements / limit);
  if (pagination.available === page || pagination.available === 0)
    delete pagination.available;

  if (startIndex > 0) {
    pagination.skipped = Math.ceil(startIndex / limit);
  }

  pagination.current = page;

  return { pagination, limit, startIndex };
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
    livingRoomsSqmMin,
    livingRoomsSqmMax,
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
  conditions.price = setMinMaxFilter(priceMin, priceMax);

  // Rooms
  conditions.rooms = setMinMaxFilter(roomsMin, roomsMax);

  // Estate type
  if (estateType) conditions.estateType = estateType;

  // Estate type
  if (apartmentType) conditions.apartmentType = apartmentType;

  // Sqm
  conditions.sqm = setMinMaxFilter(sqmMin, sqmMax);
  conditions.livingRoomsSqm = setMinMaxFilter(
    livingRoomsSqmMin,
    livingRoomsSqmMax,
  );
  conditions.kitchenSqm = setMinMaxFilter(kitchenSqmMin, kitchenSqmMax);
  conditions.lotSqm = setMinMaxFilter(lotSqmMin, lotSqmMax);

  // Floor
  conditions.totalFloors = setMinMaxFilter(totalFloorsMin, totalFloorsMax);
  conditions.floor = setMinMaxFilter(floorMin, floorMax);

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
  if (ids) conditions.id = { $in: ids.split(',') };

  return conditions;
};

const postSearch = async (req, res, next) => {
  // userId validation
  const { user } = req.query;
  if (user && !mongoose.Types.ObjectId.isValid(user)) {
    return res.status(404).json({ errors: [{ msg: 'User not found' }] });
  }

  // Set filters
  req.conditions = setPostsFilters(req);

  // Pagination
  try {
    req.paginatedResults = await getPaginatedResults(req);
  } catch (error) {
    // No pagination info
  }

  return next();
};

module.exports = postSearch;
