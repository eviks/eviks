const express = require('express')
const router = express.Router()

const Locality = require('../../models/Locality')

// @route GET api/localities/
// @desc  Get localities
// @access Public
router.get('/', async (req, res) => {
  try {
    const localities = await Locality.aggregate([
      { $match: req.query },
      { $sort: { name: 1 } }
    ])

    localities.forEach(
      locality =>
        locality.children &&
        locality.children.sort((a, b) => a.name.localeCompare(b.name))
    )

    // Localities not found
    if (!localities) {
      return res.status(404).json({ errors: [{ msg: 'Localities not found' }] })
    }

    return res.json(localities)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error...')
  }
})

// @route GET api/localities/getByIds/
// @desc  Get localities by list of ids
// @access Public
router.get('/getByIds/', async (req, res) => {
  try {
    const ids = req.query.ids

    if (!ids) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'ids parameter must be specified' }] })
    }

    const localities = await Locality.find({ id: { $in: ids.split(',') } })

    // Localities not found
    if (!localities) {
      return res.status(404).json({ errors: [{ msg: 'Localities not found' }] })
    }

    return res.json(localities)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error...')
  }
})

module.exports = router
