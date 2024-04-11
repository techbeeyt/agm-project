const mongoose = require("mongoose");

const marketDataSchema = new mongoose.Schema({
  itemName: String,
  date: Date,
  stateName: String,
  districtName: String,
  marketName: String,
  variety: String,
  group: String,
  arrivalsTonnes: Number,
  minPriceRsQuintal: Number,
  maxPriceRsQuintal: Number,
  modalPriceRsQuintal: Number,
  reportedDate: Number,
});

const MarketData = mongoose.model("MarketData", marketDataSchema);

module.exports = MarketData;
