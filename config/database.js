const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://shayaanhaquedgp:Shayaan_6565@nmnodes2.ckjliew.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NMNodeS2"
  );
};

module.exports = {
  connectDB,
};
