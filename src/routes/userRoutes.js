const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

let users = [];

// Register a new user
router.post("/register", async (req, res) => {
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

  try {
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, password: hashedPassword, email };
    users.push(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: { username, email },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // check if the request body is valid
  if (!username || !password) {
    return res.status(400).json({
      error: "Please Provide Non Empty User Information for Login!",
    });
  }

  // Find user by username
  const user = users.find((user) => user.username === username);

  // Check if user exists
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
