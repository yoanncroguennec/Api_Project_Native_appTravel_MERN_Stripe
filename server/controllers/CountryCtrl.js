const CountryModel = require("../models/Country");

const countryCtrl = {
  createCountry: async (req, res, next) => {
    try {
      const { title, desc, imageUrl, location, popular } = req.body;
      // STEP 1 : Create New Country
      const newCountry = new CountryModel({
        title, // "title: req.body.title" la même chose que "title: title"
        desc,
        imageUrl,
        location,
        popular,
      });

      // STEP 2 : sauvegarder ce nouvel Country dans la BDD
      await newCountry.save();
      // ATTENTION !! Affiche le résultat sur Postman que quand on lance le server depuis l'api direct et non par la dépendance concurrently" de Front-end (client)
      res.status(201).json(newCountry);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getCountry: async (req, res, next) => {
    try {
      const country = await CountryModel.findById(req.params.id);
      res.status(200).json(country);
    } catch (err) {
      next(err);
    }
  },

  getAllCountries: async (req, res, next) => {
    try {
      const countries = await CountryModel.find();
      res.status(200).json(countries);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = countryCtrl;
