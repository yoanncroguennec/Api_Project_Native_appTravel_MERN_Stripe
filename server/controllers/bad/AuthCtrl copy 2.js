const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// MODELS
const UserModel = require("../../models/User");

const authCtrl = {
  signup: async (req, res, next) => {
    try {
      const { username, email, firstName, lastName, password, dob } = req.body;
      const user = await UserModel.findOne({ email: email });

      if (user === null) {
        const token = uid2(64); // Génère Token qui fera 64 caractères de long
        const salt = uid2(64); // Génère Salt qui fera 64 caractères de long
        const hash = SHA256(password + salt).toString(encBase64);
        console.log("hash :", hash);

        // STEP 2 : créer le nouvel utilisateur
        const newUser = new UserModel({
          account: {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
          },
          token: token,
          hash: hash,
          salt: salt,
        });
        //  res.json("OK");

        await newUser.save();
        // res.json(newUser);
        res.json({
          _id: newUser._id,
          token: newUser.token,
          orders: newUser.orders,
          // SECTION ACCOUNT
          email: newUser.account,
        });
      } else {
        res.status(409).json({ error: "Email déjà prise" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  /////////////////////////////
  ///////// CONNEXION /////////
  /////////////////////////////
  login: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (user) {
        if (
          // Recréer un hash à partir du salt du user trouvé et du MDP reçu
          SHA256(req.body.password + user.salt).toString(encBase64) ===
          user.hash
        ) {
          res.status(200).json({
            _id: user._id,
            token: user.token,
            account: user.account,
          });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authCtrl;
