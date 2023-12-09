const mongoose = require("mongoose");

const CountryModel = mongoose.model("Country", {
  country: {
    type: String,
    unique: true,
  },
  desc: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  region: {
    type: String,
  },
  popular: {
    type: Array,
  },
});

module.exports = CountryModel;
