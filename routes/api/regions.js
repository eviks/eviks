const express = require('express')
const router = express.Router()

const Region = require('../../models/Region')

// @route GET api/regions/
// @desc  Get regions
// @access Public
router.get('/', async (req, res) => {
  try {
    const regions = await Region.aggregate([
      { $match: req.query },
      { $sort: { Name: 1 } }
    ])

    regions.forEach(
      region =>
        region.children &&
        region.children.sort((a, b) => a.Name.localeCompare(b.Name))
    )

    // Regions not found
    if (!regions) {
      return res
        .status(404)
        .json({ errors: [{ message: 'Regions not found' }] })
    }

    return res.json(regions)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error...')
  }
})

module.exports = router
