const TouristAttraction_Model = require("../models/TouristAttraction");

const touristAttraction_Ctrl = {
  getTouristAttraction: async (req, res, next) => {
    try {
      const touristAttraction = await TouristAttraction_Model.findById(
        req.params.id
      );
      res.status(200).json(touristAttraction);
    } catch (err) {
      next(err);
    }
  },

  getAllTouristAttractions: async (req, res, next) => {
    try {
      const touristAttractions = await TouristAttraction_Model.find();
      res.status(200).json(touristAttractions);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = touristAttraction_Ctrl;
