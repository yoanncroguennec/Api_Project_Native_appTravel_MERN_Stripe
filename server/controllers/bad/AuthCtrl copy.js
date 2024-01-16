const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// MODELS
const UserModel = require("../../models/User");

const authCtrl = {
  signup: async (req, res, next) => {
    try {
      const {
        username,
        email,
        firstName,
        lastName,
        dob,
        // postalAddress,
        // postalCode,
        // city,
        // phoneNumber,
        password,
      } = req.body;
      // STEP 1 : encrypter le mot de passe
      // Générer le token et encrypter le mot de passe
      const token = uid2(64); // Génère Token qui fera 64 caractères de long
      const salt = uid2(64); // Génère Salt qui fera 64 caractères de long
      // On concatène le "salt" avec le "passord"
      // "encBase64" Donner en argument
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
          // postalAddress: postalAddress,
          // postalCode: postalCode,
          // city: city,
          // phoneNumber: phoneNumber,
        },
        token: token,
        hash: hash,
        salt: salt,
      });

      // res.json("Ok")
      //   // STEP 3 : sauvegarder ce nouvel user dans la BDD
      await newUser.save();
      //   // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently"" de Front-end (client)
      res.status(201).json({
        id: newUser._id,
        token: newUser.token,
        orders: newUser.orders,
        // SECTION ACCOUNT
        email: newUser.account.username,
        username: newUser.account.email,
        photo: newUser.account.photo,
        firstName: newUser.account.firstName,
        lastName: newUser.account.lastName,
        dob: newUser.account.dob,
        //   postalAddress: newUser.account.postalAddress,
        //   postalCode: newUser.account.postalCode,
        //   city: newUser.account.city,
        //   phoneNumber: newUser.account.phoneNumber,
      });
      return res.status(400).json(res);
      // res.json(res);
      // } else {
      //   // l'utilisateur n'a pas envoyé les informations requises ?
      //   res.status(400).json({ message: "Missing parameters" });
      // }
      // }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  /////////////////////////////
  //////// INSCRIPTION ////////
  /////////////////////////////
  // signup: async (req, res, next) => {
  //   try {
  //     // check if email or username are in DB
  //     const userEmail = await UserModel.findOne({ email: req.fields.email });
  //     // const userUsername = await UserModel.findOne({
  //     //   "account.username": req.fields.username,
  //     // });

  //     if (userEmail) {
  //       res.status(400).json({ error: "Cet email est déjà prise." });
  //     // } else if (userUsername) {
  //     //   res.status(400).json({ error: "Ce pseudo est déjà pris." });
  //     } else {
  //       if (
  //         // STEP 1 : Les champs a remplir
  //         // req.fields.username &&
  //         req.fields.email
  //         // &&
  //         // req.fields.password &&
  //         // req.fields.firstName &&
  //         // req.fields.lastName &&
  //         // req.fields.dob &&
  //         // req.fields.postalAddress &&
  //         // req.fields.postalCode &&
  //         // req.fields.city &&
  //         // req.fields.phoneNumber
  //       ) {
  //         // STEP 2 : encrypter le mot de passe
  //         // Générer le token et encrypter le mot de passe
  //         // const token = uid2(64); // Génère Token qui fera 64 caractères de long
  //         // const salt = uid2(64); // Génère Salt qui fera 64 caractères de long
  //         // // On concatène le "salt" avec le "passord"
  //         // // "encBase64" Donner en argument
  //         // const hash = SHA256(req.body.password + salt).toString(encBase64);

  //         // STEP 3 : créer le nouvel user
  //         const newUser = new UserModel({
  //           username: req.fields.username,
  //           // token: token,
  //           // hash: hash,
  //           // salt: salt,
  //           // account: {
  //           //   username: req.fields.username,
  //             email: req.fields.email,
  //           //   firstName: req.fields.firstName,
  //           //   lastName: req.fields.lastName,
  //           //   dob: req.fields.dob,
  //           //   postalAddress: req.fields.postalAddress,
  //           //   postalCode: req.fields.postalCode,
  //           //   city: req.fields.city,
  //           //   phoneNumber: req.fields.phoneNumber,
  //           // },
  //         });

  //         // STEP 4 : sauvegarder ce nouvel user dans la BDD
  //         await newUser.save();
  //         // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently"" de Front-end (client)
  //         res.status(201).json({
  // // id: newUser._id,
  // // token: newUser.token,
  // // orders: newUser.orders,
  // // // SECTION ACCOUNT
  // email: newUser.account.username,
  // // username: newUser.account.email,
  // // photo: newUser.account.photo,
  // // firstName: newUser.account.firstName,
  // // lastName: newUser.account.lastName,
  // // dob: newUser.account.dob,
  // // postalAddress: newUser.account.postalAddress,
  // // postalCode: newUser.account.postalCode,
  // // city: newUser.account.city,
  // // phoneNumber: newUser.account.phoneNumber,
  //         });
  //         // return res.status(400).json(res);
  //         // res.json(res);
  //       } else {
  //         // l'user n'a pas envoyé les informations requises ?
  //         res.status(400).json({ error: "Missing parameters" });
  //       }
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  // signup: async (req, res, next) => {
  //   try {
  //     const user = await UserModel.findOne({ email: req.fields.email });
  //     if (user) {
  //       res.status(409).json({ message: "Cette email est déjà prise." });
  //     } else {
  //       // l'user a bien envoyé les infos requises ?
  //       if (
  //         // Les champs OBLIGATOIRE a remplir
  //         req.fields.email
  //         // &&
  //         // req.body.password &&
  //         // req.body.name
  //       ) {
  //         // STEP 1 : encrypter le mot de passe
  //         // Générer le token et encrypter le mot de passe
  //         const token = uid2(64); // Génère Token qui fera 64 caractères de long
  //         const salt = uid2(64); // Génère Salt qui fera 64 caractères de long
  //         // On concatène le "salt" avec le "passord"
  //         // "encBase64" Donner en argument
  //         const hash = SHA256(req.body.password + salt).toString(encBase64);

  //         // STEP 2 : créer le nouvel utilisateur
  //         const newUser = new UserModel({
  //           account: {
  //             email: req.fields.email,
  //           },
  //           // name: req.body.name,
  //           // token: token,
  //           // hash: hash,
  //           // salt: salt,
  //         });

  //         // STEP 3 : sauvegarder ce nouvel user dans la BDD
  //         await newUser.save();
  //         // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently"" de Front-end (client)
  //         res.status(201).json({
  //           _id: newUser._id,
  //           // name: newUser.name,

  //           email: newUser.account.username,
  //           // token: newUser.token,
  //         });
  //         // return res.status(400).json(res);
  //         // res.json(res);
  //       } else {
  //         // l'utilisateur n'a pas envoyé les informations requises ?
  //         res.status(400).json({ message: "Missing parameters" });
  //       }
  //     }
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },

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
