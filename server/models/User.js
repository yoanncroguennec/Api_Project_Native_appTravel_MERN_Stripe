const mongoose = require("mongoose");


const UserModel = mongoose.model("User", {
  token: String,
  hash: String,
  salt: String,
  account: {
    username: {
      type: String,
      required: "Entrez votre pseudo",
      // unique: true,
    },
    email: {
      type: String,
      require: true,
      // required: "Entrez votre email",
      // unique: true,
    },
    photo: {
      type: Object,
      default: null,
    },
    firstName: {
      type: String,
      required: "Entrez votre prénom",
    },
    lastName: {
      type: String,
      required: "Entrez votre nom de famille",
    },
    dob: {
      type: String,
      required: true,
    },
    postalAddress: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserModel;
