const mongoose = require("mongoose");

// {
//     "email": "test@gmail.com",
//     "username": "yoyo",
//     "password": "jjjj"
// }

const UserModel = mongoose.model("User", {
  email: {
    type: String,
    unique: true,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = UserModel;
