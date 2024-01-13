const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// MODELS
const UserModel = require("../models/User");

const authCtrl = {
  signup: async (req, res, next) => {
	try {
    //? Destructuring
    const {
      username,
      email,
      password,
      // firstName,
      // lastName,
      // dob,
      // postalAddress,
      // postalCode,
      // city,
      // phoneNumber,
    } = req.body;

    const isEmailAlreadyExist = await UserModel.findOne({ email });
    //console.log(email, isEmailAlreadyExist);
    if (isEmailAlreadyExist) {
      return res
        .status(409)
        .json({ message: "This email already has an account" });
    }

    const isPassword = await UserModel.findOne({ password });
    //console.log(email, isEmailAlreadyExist);
    if (isPassword) {
      return res
        .status(409)
        .json({ message: "This email already has an account" });
    }

    //todo cas d'erreur, le username n'est pas renseigné
    if (username === "" || username === undefined) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    if (email && password && username) {
      const salt = uid2(16);
      //console.log("salt: ", salt);
      const hash = SHA256(password + salt).toString(encBase64);
      //console.log("hash: ", hash);
      const token = uid2(64);
      //console.log("token: ", token);

      const newUser = new UserModel({
        account: {
          username,
          email,
          // firstName,
          // lastName,
          // dob,
          // postalAddress,
          // postalCode,
          // city,
          // phoneNumber,
        },
        salt,
        hash,
        token,
      });

      // Étape 3 : sauvegarder ce nouvel utilisateur dans la BDD
      await newUser.save();
      const response = {
        _id: newUser._id,
        account: newUser.account,
        token: newUser.token,
      };
      res.status(200).json(response);
    } else {
      // l'utilisateur n'a pas envoyé les informations requises ?
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
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
