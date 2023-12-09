const mongoose = require("mongoose");

const HotelModel = mongoose.model("Hotel", {
  availability: {
    type: Object,
  },
  _id_Country: {
    type: String,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  contact: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  coordinates: {
    type: Object,
  },
  facilities: {
    type: Array,
  },
  reviews: {
    type: Array,
  },
  popular: {
    type: Array,
  },
});

module.exports = HotelModel;
