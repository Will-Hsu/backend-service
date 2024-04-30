const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// user routes for user (registration/login) authentication
app.use("/user", userRoutes);

// root path
app.get("/", (req, res) => {
  res.send("Welcome to the API Backend server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
