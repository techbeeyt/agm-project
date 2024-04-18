const MarketData = require("../model/Items");
const moment = require("moment");

const userController = {
  async getCrop(req, res) {
    try {
      const { date, crop } = req.query;

      const formattedDate = moment(date, "DD-MM-YYYY").toDate();

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

      const formattedDate = moment(date, "DD-MM-YYYY").toDate();

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

  async getStates(req, res) {
    try {
      const states = await MarketData.distinct("stateName");
      console.log("states", states);
      res.status(200).json({
        success: true,
        message: "Received States",
        data: states,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getAllDistricts(req, res) {
    try {
      const data = await MarketData.distinct("districtName");

      res.status(200).json({
        success: true,
        message: "Received All Districts",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getDistrictsByState(req, res) {
    try {
      const state = req.params.state;
      const data = await MarketData.distinct("districtName", {
        stateName: state,
      });

      res.status(200).json({
        success: true,
        message: "Received All Districts",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getAllMarkets(req, res) {
    try {
      const market = await MarketData.distinct("marketName");

      res.status(200).json({
        success: true,
        message: "Received All Market",
        data: market,
      });
    } catch (error) {}
  },

  async getMarketsByDistrict(req, res) {
    try {
      const district = req.params.district;
      const data = await MarketData.distinct("marketName", {
        districtName: district,
      });

      res.status(200).json({
        success: true,
        message: "Received Market",
        data,
      });
    } catch (error) {}
  },
};

module.exports = userController;
