const HotelModel = require("../models/Hotel");

const hotelCtrl = {
  getHotel: async (req, res, next) => {
    try {
      const hotel = await HotelModel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  },

  getAllHotels: async (req, res, next) => {
    try {
      const hotels = await HotelModel.find();
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = hotelCtrl;
