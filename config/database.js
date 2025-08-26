const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
  mongoose.connect(
     process.env.URL
  );
};

module.exports = {
  connectDB,
};
