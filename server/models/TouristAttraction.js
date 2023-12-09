const mongoose = require("mongoose");

const TouristAttraction_Model = mongoose.model("TouristAttraction", {
  _id_Country: {
    type: String,
  },
  title: {
    type: String,
    unique: true,
  },
  desc: {
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
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  location: {
    type: String,
  },
  id_hotels: {
    type: Array,
  },
});

module.exports = TouristAttraction_Model;
