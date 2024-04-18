const xlsx = require("xlsx");
const MarketData = require("../model/Items");
const moment = require("moment");

const uploadExcelFile = async (req, res) => {
  try {
    // get date and item name first;
    const date = new Date(req.body.date);

    const itemName = req.body.itemName;

    // others
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const colNames = [
      "stateName",
      "districtName",
      "marketName",
      "variety",
      "group",
      "arrivalsTonnes",
      "minPriceRsQuintal",
      "maxPriceRsQuintal",
      "modalPriceRsQuintal",
      "reportedDate",
    ];

    const findStartIndex = (index) => {
      let startIndex;
      if (rows[index].length < 2) {
        startIndex = findStartIndex(index + 1);
      } else {
        startIndex = index + 1;
      }
      return startIndex;
    };

    const startIndex = findStartIndex(0);

    // Convert to array of objects with column headers as keys
    const formattedData = rows.slice(startIndex).map((row) => {
      const formattedRow = {
        date,
        itemName,
      };
      for (let i = 0; i < colNames.length; i++) {
        formattedRow[colNames[i]] = row[i];
      }

      return formattedRow;
    });

    let result = [];
    // Save rows to MongoDB
    for (const data of formattedData) {
      const row = new MarketData(data);
      const res = await row.save();
      result.push(res);
    }
    res.send({
      success: true,
      rows: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    const _id = req.params.id;

    const edited = await MarketData.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      data: edited,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      data: {},
    });
  }
};

const _delete = async (req, res) => {
  try {
    const _id = req.params.id;

    const edited = await MarketData.findByIdAndDelete(_id, {
      new: true,
    });
    res.json({
      success: true,
      data: edited,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      data: {},
    });
  }
};

const adminController = {
  uploadExcelFile,
  update,
  _delete,
};

module.exports = adminController;
