const express = require("express");
const dbConnect = require("./config/db");
const colors = require("colors");
const cors = require("cors");
const workoutRoutes = require("./routes/workoutRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// function to connect database
dbConnect();

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use("/api/workout", workoutRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`.yellow.bold);
});
