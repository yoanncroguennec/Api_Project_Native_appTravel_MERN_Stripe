const mongoose = require("mongoose");

// {
// "email": "yoann.crogennec@gmail.com",
// "name": "yoann",
// "password": "95449544"
// }

const UserModel = mongoose.model("User", {
  name: {
    type: String,
    default: null,
    required: "Entrez votre prénom",
  },
  email: {
    type: String,
    required: "Entrez votre email",
    unique: true,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserModel;

// const mongoose = require("mongoose");

// const UserModel = mongoose.model("User", {
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   token: String,
//   hash: String,
//   salt: String,
//   password: {
//     type: String,
//     // required: true,
//   },
// dob: {
//   type: String,
//   required: true,
// },
// address: {
//   type: String,
//   required: true,
// },
// });

// module.exports = UserModel;
