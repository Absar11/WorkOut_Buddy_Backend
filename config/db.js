const mongoose = require("mongoose");
const colors = require("colors");

const dbConnect = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {});

    console.log(`Database Connected Successfully`.cyan.underline);
  } catch (error) {
    console.log("Error to connect Database".red.underline);
    process.exit(1);
  }
};

module.exports = dbConnect;
