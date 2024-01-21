const express = require("express");
const dbConnect = require("./config/db");
const colors = require("colors");
const workoutRoutes = require("./routes/workoutRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());

// function to connect database
dbConnect();

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/v1", workoutRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`.yellow.bold);
});
