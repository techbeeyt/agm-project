const MarketData = require("../model/Items");

const userController = {
  async getCrop(req, res, next) {
    try {
      const { date, crop } = req.query;
      let _date = new Date(date);

      console.log(_date);

      if (!date || !crop)
        res.status(400).json({
          success: false,
          message: "Invalid Request",
          data: [],
        });

      const data = await MarketData.find({
        $and: [
          {
            date: _date,
          },
          {
            itemName: crop,
          },
        ],
      });
      res.status(200).json({
        success: true,
        message: "Received Crop Data",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getYard(req, res, next) {
    try {
      const { date, state, district, market } = req.query;

      const formattedDate = new Date(date);

      if (!date || !state || !district || !market) {
        return res.status(400).json({
          success: false,
          message: "Invalid Request",
          data: [],
        });
      }

      console.log(date, state, district, market);

      const del = await MarketData.deleteMany({
        marketName:
          '<tr style="color:White;background-color:#214C5B;font-weight:bold;background-color:#99CCFF;">',
      });

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
        message: "Received Yard Data",
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getStates(req, res, next) {
    try {
      const states = await MarketData.distinct("stateName");
      res.status(200).json({
        success: true,
        message: "Received States",
        data: states,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async getAllDistricts(req, res, next) {
    try {
      const data = await MarketData.distinct("districtName");

      res.status(200).json({
        success: true,
        message: "Received All Districts",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async getDistrictsByState(req, res, next) {
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
      next(error);
    }
  },

  async getAllMarkets(req, res, next) {
    try {
      const market = await MarketData.distinct("marketName");

      res.status(200).json({
        success: true,
        message: "Received All Market",
        data: market,
      });
    } catch (error) {
      next(error);
    }
  },

  async getMarketsByDistrict(req, res, next) {
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
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
