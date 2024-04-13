const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const verifyToken = require("./middlewares/verifyToken");
const colors = require("./constants/colors");
const connectToMongoDB = require("./config/dbConnection");
const { adminRouter, userRouter } = require("./routers");
const authRouter = require("./routers/AuthRouter");
const app = express();
const path = require("path");

// antalanayan;

// LOAD ENVIRONMENT VARIABLES
require("dotenv").config({
  path: "./.env",
});

// Middlewares

// ENABLE CORS
app.use(cors({ credentials: true, origin: "localhost" }));

// important middlewares
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

// Express Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// GET Server health
app.use("/health", async (req, res, next) => {
  try {
    res.send(`Server is OK!`);
  } catch (error) {
    next(error);
  }
});

// USE API GROUP
app.use("/api/admin", adminRouter);
app.use("/api/data", userRouter);
app.use("/api/auth", authRouter);

// serve client
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../agm-frontend/dist")));

// Catchall handler to serve index.html if route doesn't match any static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../agm-frontend/dist", "index.html"));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.TASKMANAGER_PORT || 3000;

// Connect TO Database
connectToMongoDB();

app.listen(PORT, () => {
  console.log(
    colors.bgGreen,
    "Server:",
    colors.reset,
    "running on port " + PORT
  );
});
