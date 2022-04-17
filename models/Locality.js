const mongoose = require('mongoose');

const LocalitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  nameRu: {
    type: String,
    required: true,
    index: true,
  },
  nameEn: {
    type: String,
    required: true,
    index: true,
  },
  routeName: {
    type: String,
    index: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
    index: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  metroStations: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'metroStations',
          required: true,
        },
        cityId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        nameRu: {
          type: String,
          required: true,
        },
        nameEn: {
          type: String,
          required: true,
        },
        x: {
          type: Number,
          required: true,
        },
        y: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  children: Array,
});

const Locality = mongoose.model('localities', LocalitySchema);

module.exports = Locality;
