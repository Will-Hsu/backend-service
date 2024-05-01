const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

// user routes for user (registration/login) authentication
app.use("/user", userRoutes);

// root path
app.get("/", (req, res) => {
  res.send("Welcome to the API Backend server");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err.message));
