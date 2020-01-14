const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  generalInfo: {
    userType: String,
    city: String,
    district: String,
    address: String
  },
  estate: {
    estateType: String,
    rooms: Number,
    sqm: Number,
    livingRoomsSqm: Number,
    kitchenSqm: Number,
    floor: Number,
    totalFloors: Number,
    maintenance: String,
    redevelopment: Boolean,
    ceilingHeight: Number,
    yearBuild: Date,
    elevator: Boolean,
    parkingLot: Boolean,
    documented: Boolean,
    onKredit: Boolean,
    additional: {
      balcony: Boolean,
      bathroomType: String,
      windows: Number,
      frontWindow: Boolean,
      rearWindow: Boolean,
      furniture: Boolean,
      kitchenFurniture: Boolean,
      cctv: Boolean,
      phone: Boolean,
      internet: Boolean,
      electricity: Boolean,
      gas: Boolean,
      water: Boolean,
      heating: Boolean,
      tv: Boolean,
      conditioner: Boolean,
      washingMachine: Boolean,
      dishwasher: Boolean,
      refrigerator: Boolean
    }
  },
  description: String,
  priceInfo: {
    price: Number,
    bargain: Boolean,
    progressPayment: Boolean
  },
  photos: [{ type: mongoose.Schema.ObjectId, ref: 'uploads.files' }],
  contact: String
})

module.exports = Post = mongoose.model('post', PostSchema)
