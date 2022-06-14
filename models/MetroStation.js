const mongoose = require('mongoose');

const MetroStationSchema = new mongoose.Schema({
  _id: Number,
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
});

const MetroStation = mongoose.model('metroStations', MetroStationSchema);

module.exports = MetroStation;
