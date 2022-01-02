const express = require('express');
const axios = require('axios');
const config = require('config');

const Locality = require('../../models/Locality');

const router = express.Router();

// @route GET api/localities/
// @desc  Get localities
// @access Public
router.get('/', async (req, res) => {
  try {
    const { query } = req;
    if (query.id) {
      query.id = { $in: query.id.split(',') };
    }

    const localities = await Locality.aggregate([
      { $match: query },
      { $sort: { name: 1 } },
    ]);

    localities.forEach(
      (locality) =>
        locality.children &&
        locality.children.sort((a, b) => a.name.localeCompare(b.name)),
    );

    // Localities not found
    if (!localities) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Localities not found' }] });
    }

    return res.json(localities);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error...');
  }
});

// @route GET api/localities/getByIds/
// @desc  Get localities by list of ids
// @access Public
router.get('/getByIds/', async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'ids parameter must be specified' }] });
    }

    const localities = await Locality.find({ id: { $in: ids.split(',') } });

    // Localities not found
    if (!localities) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Localities not found' }] });
    }

    return res.json(localities);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error...');
  }
});

// @route POST api/localities/getAddressByCoords
// @desc  Get address
// @access Private
router.post('/getAddressByCoords', async (req, res) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const result = await axios.post(
      'http://api.gomap.az/Main.asmx/getAddressByCoords',
      { ...req.body, guid: config.get('goMapGUID') },
      axiosConfig,
    );
    return res.json(JSON.parse(result.data.replace('{"d":null}', '')));
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error...');
  }
});

// @route GET api/localities/geocoder
// @desc  Search on map by query
// @access Public
router.get('/geocoder', async (req, res) => {
  const urlParams = new URLSearchParams(req.query).toString();

  try {
    const result = await axios.post(
      `https://gomap.az/maps/search/index/az?${urlParams}`,
    );
    return res.json(result.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error...');
  }
});

module.exports = router;
