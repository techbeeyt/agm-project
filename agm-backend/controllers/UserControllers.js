const MarketData = require("../model/Items");
const moment = require("moment");

const userController = {
  async getCrop(req, res) {
    try {
      const { date, crop } = req.query;

      const formattedDate = moment(date).format("DD-MM-YYYY");

      if (!date || !crop)
        res.status(400).json({
          success: false,
          message: "Invalid Request",
          data: [],
        });

      const data = await MarketData.find({
        $and: [
          { date: formattedDate },
          {
            itemName: crop,
          },
        ],
      });
      console.log(data);
      res.status(200).json({
        success: true,
        message: "Received Crop Data",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: [],
      });
    }
  },

  async getYard(req, res) {
    try {
      const { date, state, district, market } = req.query;

      const formattedDate = moment(date).format("DD-MM-YYYY");

      console.log(
        !date || !state || !district || !market,
        date,
        state,
        district,
        market
      );
      if (!date || !state || !district || !market) {
        return res.status(400).json({
          success: false,
          message: "Invalid Request",
          data: [],
        });
      }

      const data = await MarketData.find({
        $and: [
          {
            date: formattedDate,
          },
          {
            stateName: state,
          },
          {
            districtName: district,
          },
          {
            marketName: market,
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Received Crop Data",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: [],
      });
    }
  },
};

module.exports = userController;
