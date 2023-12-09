const router = require("express").Router();
// CONTROLLERS
const hotelCtrl = require("../controllers/HotelCtrl");

router.route("/").get(hotelCtrl.getAllHotels);

router.route("/:id").get(hotelCtrl.getHotel);

module.exports = router;
