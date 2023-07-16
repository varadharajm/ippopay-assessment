const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to API Server" });
});

//invalid route
app.use((req, res, next) => {
  res.status(404).json({
    message: "Invalid Route",
    statuscode: 404,
  });
});

//server error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Server Error",
    statuscode: 500,
  });
});

module.exports = app;
