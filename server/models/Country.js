const mongoose = require("mongoose");

const CountryModel = mongoose.model("Country", {
  title: {
    type: String,
    // unique: true,
  },
  desc: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  location: {
    type: String,
  },
  popular: {
    type: Array,
  },
});

module.exports = CountryModel;
