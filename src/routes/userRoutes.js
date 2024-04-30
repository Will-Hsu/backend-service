const express = require("express");
const router = express.Router();

let users = [];

// Register a new user
router.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  // check if the request body is valid
  if (!username || !password || !email) {
    return res.status(400).json({
      error: "Please Provide Non Empty User Information for Registration!",
    });
  }

  // Check if user already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Create new user object
  const newUser = { username, password, email };
  users.push(newUser);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

// User login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // check if the request body is valid
  if (!username || !password) {
    return res.status(400).json({
      error: "Please Provide Non Empty User Information for Login!",
    });
  }

  // Find user by username
  const user = users.find((user) => user.username === username);

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.json({ message: "Login successful", user });
});

module.exports = router;
