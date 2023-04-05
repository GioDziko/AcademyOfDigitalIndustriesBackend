//APP
const express = require("express");
const App = express();

//ROUTES
const authRouter = require("./routes/auth");

//CONFIG
require("dotenv").config();
const connectDB = require("./db/connect");

//MIDDLEWARE

const { errorHandlerMiddleware } = require("./middleware/errorHandler");

//SECURITY
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const { notFound } = require("./middleware/not-found");

App.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
  })
);
App.use(express.json());
App.use(helmet());
App.use(cors());
App.use(xss());

//APPLICATION ROUTES

App.use("/api/v1/auth", authRouter.Router);

App.use(errorHandlerMiddleware);
App.use(notFound);
// SERVER
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    App.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
