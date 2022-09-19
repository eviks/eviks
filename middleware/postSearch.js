const mongoose = require('mongoose');

const Post = require('../models/Post');
const UnreviewedPost = require('../models/UnreviewedPost');

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

  let model;

  if (req.path === '/unreviewed_posts') {
    model = UnreviewedPost;
  } else {
    model = Post;
  }

  const numberOfElements = await model
    .find(req.conditions, {})
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
    metroStationId,
    dealType,
    priceMin,
    priceMax,
    roomsMin,
    roomsMax,
    rooms,
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
    userId,
    ids,
    reviewStatus,
  } = req.query;

  const conditions = {};

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

  // Metro station
  if (metroStationId) {
    conditions['metroStation._id'] = {
      $in: metroStationId.split(',').map((element) => {
        return Number(element);
      }),
    };
  }

  // Deal type
  if (dealType) conditions.dealType = dealType;

  // Price
  const price = setMinMaxFilter(priceMin, priceMax);
  if (price) {
    conditions.price = price;
  }

  // Rooms
  if (rooms) {
    conditions.rooms = { $in: rooms.split(',') };
  } else {
    const roomsFilter = setMinMaxFilter(roomsMin, roomsMax);
    if (roomsFilter) {
      conditions.rooms = roomsFilter;
    }
  }

  // Estate type
  if (estateType) conditions.estateType = estateType;

  // Estate type
  if (apartmentType) conditions.apartmentType = apartmentType;

  // Sqm
  const sqm = setMinMaxFilter(sqmMin, sqmMax);
  if (sqm) {
    conditions.sqm = sqm;
  }

  const livingRoomsSqm = setMinMaxFilter(livingRoomsSqmMin, livingRoomsSqmMax);
  if (livingRoomsSqm) {
    conditions.livingRoomsSqm = livingRoomsSqm;
  }

  const kitchenSqm = setMinMaxFilter(kitchenSqmMin, kitchenSqmMax);
  if (kitchenSqm) {
    conditions.kitchenSqm = kitchenSqm;
  }

  const lotSqm = setMinMaxFilter(lotSqmMin, lotSqmMax);
  if (lotSqm) {
    conditions.lotSqm = lotSqm;
  }

  // Floor
  const totalFloors = setMinMaxFilter(totalFloorsMin, totalFloorsMax);
  if (totalFloors) {
    conditions.totalFloors = totalFloors;
  }

  const floor = setMinMaxFilter(floorMin, floorMax);
  if (floor) {
    conditions.floor = floor;
  }

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
  if (userId && mongoose.Types.ObjectId.isValid(userId))
    conditions.user = userId;

  // Ids
  // eslint-disable-next-line no-underscore-dangle
  if (ids) conditions._id = { $in: ids.split(',') };

  if (reviewStatus) conditions.reviewStatus = reviewStatus;

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
