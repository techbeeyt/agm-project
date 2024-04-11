const CustomError = require("../utils/CustomError");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let success = true;
  let statusCode = 500;
  let message = "Internal Server Error";
  let error;

  if (err instanceof CustomError) {
    success = false;
    statusCode = err.statusCode || 500;
    message = err.message;
  }

  // GENERAL ERRORS
  // pg duplicate unique
  if (err.code === "23505") {
    success = false;
    const duplicateField = err.constraint.split("_")[0];
    statusCode = 409;
    message = `${
      duplicateField[0].toUpperCase() + duplicateField.slice(1)
    } is already exists`;
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

module.exports = errorHandler;
