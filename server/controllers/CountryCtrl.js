const CountryModel = require("../models/Country");

const countryCtrl = {
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
