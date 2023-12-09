const router = require("express").Router();
// CONTROLLERS
const countryCtrl = require("../controllers/CountryCtrl");

router.route("/").get(countryCtrl.getAllCountries);

router.route("/:id").get(countryCtrl.getCountry);

module.exports = router;
