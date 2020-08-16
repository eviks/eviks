const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userName: String,
  userType: String,
  city: {
    name: String,
    id: String,
    location: [Number, Number]
  },
  district: {
    name: String,
    id: String,
    location: [Number, Number]
  },
  subdistrict: {
    name: String,
    id: String,
    location: [Number, Number]
  },
  address: String,
  location: [Number, Number],
  estateType: String,
  apartmentType: String,
  dealType: String,
  rooms: Number,
  sqm: Number,
  livingRoomsSqm: Number,
  kitchenSqm: Number,
  lotSqm: Number,
  floor: Number,
  totalFloors: Number,
  maintenance: String,
  redevelopment: Boolean,
  ceilingHeight: Number,
  yearBuild: Number,
  elevator: Boolean,
  parkingLot: Boolean,
  documented: Boolean,
  mortgage: Boolean,
  kidsAllowed: Boolean,
  petsAllowed: Boolean,
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
  refrigerator: Boolean,
  garage: Boolean,
  pool: Boolean,
  bathhouse: Boolean,
  description: String,
  price: Number,
  bargain: Boolean,
  progressPayment: Boolean,
  prepayment: Boolean,
  municipalServices: Boolean,
  photos: Array,
  contact: String,
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = Post = mongoose.model('post', PostSchema)
