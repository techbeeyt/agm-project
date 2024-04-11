const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // retreive token from header
    const token = req.headers["authorization"].split(" ")[1];

    // verify token
    const user = jwt.verify(token, process.env.JWT_SEC);
    // add user to the request
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      messgae: "You are not allowed to access",
    });
  }
};

module.exports = verifyToken;
