const mongoose = require("mongoose");
const colors = require("../constants/colors");

async function connectToMongoDB() {
  const connectionString =
    process.env.MONGODB_URI || "mongodb://localhost:27017/marketdb";
  try {
    await mongoose.connect(connectionString, {});
    console.log(
      colors.bgCyan,
      "MongoDB:",
      colors.reset,
      "Connected to MongoDB"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToMongoDB;
