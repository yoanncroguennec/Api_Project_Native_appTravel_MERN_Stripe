const mongoose = require("mongoose");

// {
// "email": "yoann.crogennec@gmail.com",
// "name": "yoann",
// "dob": "10/05/1986",
// "password": "95449544"
// }

const UserModel = mongoose.model("User", {
  token: String,
  hash: String,
  salt: String,
      dob: {
      type: String,
      // required: true,
    },
  account: {
    username: {
      type: String,
      required: "Entrez votre pseudo",
      unique: true,
    },
    email: {
      type: String,
      required: "Entrez votre email",
      unique: true,
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
    // dob: {
    //   type: String,
    //   // required: true,
    // },
    // postalAddress: {
    //   type: String,
    //   // required: true,
    // },
    // postalCode: {
    //   type: Number,
    //   // required: true,
    // },
    // city: {
    //   type: String,
    //   // required: true,
    // },
    // phoneNumber: {
    //   type: Number,
    //   // required: true,
    // },
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
