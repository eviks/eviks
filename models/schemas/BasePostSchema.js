const mongoose = require('mongoose');

const basePostSchema = {
  _id: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    index: true,
    enum: ['owner', 'agent'],
  },
  city: {
    type: {
      id: { type: String, index: true },
      name: String,
      nameRu: String,
      nameEn: String,
      x: Number,
      y: Number,
    },
    index: false,
    required: true,
  },
  district: {
    type: {
      id: { type: String, index: true },
      name: String,
      nameRu: String,
      nameEn: String,
      x: Number,
      y: Number,
    },
    index: false,
    required: true,
  },
  subdistrict: {
    type: {
      id: { type: String, index: true },
      name: String,
      nameRu: String,
      nameEn: String,
      x: Number,
      y: Number,
    },
    index: false,
  },
  address: {
    type: String,
    required: true,
    index: true,
  },
  metroStation: {
    _id: {
      type: Number,
      ref: 'metroStations',
      index: true,
    },
    cityId: {
      type: String,
    },
    name: {
      type: String,
    },
    nameRu: {
      type: String,
    },
    nameEn: {
      type: String,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
  location: {
    type: [Number, Number],
    required: true,
    index: true,
  },
  estateType: {
    type: String,
    required: true,
    index: true,
    enum: ['apartment', 'house'],
  },
  apartmentType: {
    type: String,
    index: true,
    enum: ['newBuilding', 'secondaryBuilding'],
  },
  dealType: {
    type: String,
    required: true,
    index: true,
    enum: ['sale', 'rent', 'rentPerDay'],
  },
  rooms: {
    type: Number,
    required: true,
    index: true,
  },
  sqm: {
    type: Number,
    required: true,
    index: true,
  },
  livingRoomsSqm: {
    type: Number,
    index: true,
  },
  kitchenSqm: {
    type: Number,
    index: true,
  },
  lotSqm: {
    type: Number,
    index: true,
  },
  floor: {
    type: Number,
    index: true,
  },
  totalFloors: {
    type: Number,
    index: true,
  },
  renovation: {
    type: String,
    index: true,
    enum: ['cosmetic', 'designer', 'noRenovation'],
  },
  redevelopment: {
    type: Boolean,
    index: true,
  },
  ceilingHeight: {
    type: Number,
    index: true,
  },
  yearBuild: {
    type: Number,
    index: true,
  },
  elevator: {
    type: Boolean,
    index: true,
  },
  parkingLot: {
    type: Boolean,
    index: true,
  },
  documented: {
    type: Boolean,
    index: true,
  },
  mortgage: {
    type: Boolean,
    index: true,
  },
  kidsAllowed: {
    type: Boolean,
    index: true,
  },
  petsAllowed: {
    type: Boolean,
    index: true,
  },
  balcony: {
    type: Boolean,
    index: true,
  },
  bathroomType: {
    type: String,
    index: true,
  },
  windows: {
    type: Number,
    index: true,
  },
  frontWindow: {
    type: Boolean,
    index: true,
  },
  rearWindow: {
    type: Boolean,
    index: true,
  },
  furniture: {
    type: Boolean,
    index: true,
  },
  kitchenFurniture: {
    type: Boolean,
    index: true,
  },
  cableTv: {
    type: Boolean,
    index: true,
  },
  phone: {
    type: Boolean,
    index: true,
  },
  internet: {
    type: Boolean,
    index: true,
  },
  electricity: {
    type: Boolean,
    index: true,
  },
  gas: {
    type: Boolean,
    index: true,
  },
  water: {
    type: Boolean,
    index: true,
  },
  heating: {
    type: Boolean,
    index: true,
  },
  tv: {
    type: Boolean,
    index: true,
  },
  conditioner: {
    type: Boolean,
    index: true,
  },
  washingMachine: {
    type: Boolean,
    index: true,
  },
  dishwasher: {
    type: Boolean,
    index: true,
  },
  refrigerator: {
    type: Boolean,
    index: true,
  },
  garage: {
    type: Boolean,
    index: true,
  },
  pool: {
    type: Boolean,
    index: true,
  },
  bathhouse: {
    type: Boolean,
    index: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  haggle: {
    type: Boolean,
    index: true,
  },
  installmentOfPayment: {
    type: Boolean,
    index: true,
  },
  prepayment: {
    type: Boolean,
    index: true,
  },
  municipalServicesIncluded: Boolean,
  images: {
    type: Array,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  reviewHistory: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        date: { type: Date, required: true },
        result: Boolean,
        comment: String,
      },
    ],
    required: false,
  },
};

module.exports = basePostSchema;
