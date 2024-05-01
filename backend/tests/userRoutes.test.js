const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("../src/routes/userRoutes");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use("/user", userRoutes);

describe("User Routes", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("should register a new user", async () => {
    const userData = {
      name: "Maggie Moradi",
      password: "password123",
      email: "maggie@intuit.com",
    };

    const response = await request(app).post("/user/register").send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should not register a duplicate user", async () => {
    const userData = {
      name: "Maggie Moradi",
      password: "password123",
      email: "maggie@intuit.com",
    };

    const response = await request(app).post("/user/register").send(userData);

    expect(response.status).toBe(400);
    expect(JSON.parse(response.error.text).error).toBe("User already exists");
  });

  it("should log in an existing user", async () => {
    const credentials = {
      email: "maggie@intuit.com",
      password: "password123",
    };

    const response = await request(app).post("/user/login").send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  it("should not log in with in correct credentials", async () => {
    const credentials = {
      email: "maggie@intuit.com",
      password: "wrongpassword",
    };

    const response = await request(app).post("/user/login").send(credentials);

    expect(response.status).toBe(401);
    expect(JSON.parse(response.error.text).error).toBe(
      "Invalid email or password"
    );
  });
});
