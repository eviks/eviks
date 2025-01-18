const getPaginatedResults = async (model, filters, page, limit) => {
  if (!page || !limit) return null;

  const startIndex = (page - 1) * limit;

  const numberOfElements = await model
    .find(filters)
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

  return pagination;
};

module.exports = { getPaginatedResults };
