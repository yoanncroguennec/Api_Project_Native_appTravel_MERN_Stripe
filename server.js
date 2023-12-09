const app = require("./app/app");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started 🧦 ${PORT}`);
});
