const router = require("express").Router();
// CONTROLLERS
const touristAttraction_Ctrl = require("../controllers/TouristAttraction_Ctrl");

router.route("/").get(touristAttraction_Ctrl.getAllTouristAttractions);

router.route("/:id").get(touristAttraction_Ctrl.getTouristAttraction);

module.exports = router;
