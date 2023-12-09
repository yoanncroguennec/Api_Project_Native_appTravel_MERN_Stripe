require("dotenv").config();

// CONNECT BDD
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

//  SERVER MODELS
const Attraction = require("../../models/Attraction");
const Country = require("../../models/Country");
const Hotel = require("../../models/Hotel");
// UTILS DATAS JSON
const attractions = require("../json/dataAttractions.json");
const countries = require("../json/dataCountries.json");
const hotels = require("../json/dataHotels.json");

const seeder = async () => {
    try {
      /* *********************************************************************
       **************************** SEED ATTRACTIONS **************************
       ********************************************************************** */
      await Attraction.deleteMany();
      console.log("Les attractions ont été effacés");

      await Attraction.insertMany(attractions);
      console.log("Les attractions ont été ajoutés");

      /* *******************************************************************
       ************************** SEED COUNTRIES **************************
       ******************************************************************** */
      await Country.deleteMany();
      console.log("Les pays ont été effacés");

      await Country.insertMany(countries);
      console.log("Les pays ont été ajoutés");

      /* *******************************************************************
       ************************** SEED HOTELS **************************
       ******************************************************************** */
      await Hotel.deleteMany();
      console.log("Les hotels ont été effacés");

      await Hotel.insertMany(hotels);
      console.log("Les hotels ont été ajoutés");

      /* *******************************************************************
       ************************** PROCESS EXIT **************************
       ******************************************************************** */
      process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seeder()