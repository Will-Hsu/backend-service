require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let users = [];
const secretKey = process.env.SECRET_KEY;

// Register a new user
router.post("/register", async (req, res) => {
  const { password, email, name } = req.body;

  // check if the request body is valid
  if (!password || !email || !name) {
    return res.status(400).json({
      error: "Please Provide Non Empty User Information for Registration!",
    });
  }

  // Check if user already exists
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { password: hashedPassword, email, name };
    users.push(newUser);

    // Generate a login token for session keeping and send it along with the name back to the client
    const token = jwt.sign(
      { userName: newUser.name, email: newUser.email },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: { token },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if the request body is valid
  if (!email || !password) {
    return res.status(400).json({
      error: "Please Provide Non Empty User Information for Login!",
    });
  }

  // Find user by email
  const user = users.find((user) => user.email === email);

  // Check if user exists
  if (!user) {
    return res.status(401).json({ error: "User does not exist" });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userName: user.name, email: user.email },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "Login successful",
      token: { token },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
