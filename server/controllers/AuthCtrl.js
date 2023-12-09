// uid2 et crypto-js sont des packages qui vont nous servir à encrypter le mot de passe
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// MODELS
const UserModel = require("../models/User");

const authCtrl = {
  signup: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        res.status(409).json({ message: "Cette email est déjà prise." });
      } else {
        // l'user a bien envoyé les infos requises ?
        if (
          // Les champs OBLIGATOIRE a remplir
          req.body.email &&
          req.body.password
        ) {
          // STEP 1 : encrypter le mot de passe
          // Générer le token et encrypter le mot de passe
          const token = uid2(64); // Génère Token qui fera 64 caractères de long
          const salt = uid2(64); // Génère Salt qui fera 64 caractères de long
          // On concatène le "salt" avec le "passord"
          // "encBase64" Donner en argument
          const hash = SHA256(req.body.password + salt).toString(encBase64);

          // STEP 2 : créer le nouvel utilisateur
          const newUser = new UserModel({
            email: req.body.email,
            token: token,
            hash: hash,
            salt: salt,
          });

          // STEP 3 : sauvegarder ce nouvel user dans la BDD
          await newUser.save();
          // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently"" de Front-end (client)
          res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            token: newUser.token,
          });
          // return res.status(400).json(res);
          // res.json(res);
        } else {
          // l'utilisateur n'a pas envoyé les informations requises ?
          res.status(400).json({ message: "Missing parameters" });
        }
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  ////////
  // LOGIN
  ////////
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
            email: user.email,
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
