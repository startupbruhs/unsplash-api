const auth = require("./auth");
const express = require("express");
const router = new express.Router();
const User = require("../../services/User");

router.get("/test", async (_, res) => {
  res.send("Test");
});

router.post("/users", async (request, response) => {
  const { status, result } = await User.create(request.body);
  response.status(status).send(result);
});

router.post("/users/login", async (request, response) => {
  const { status, result } = await User.login({
    email: request.body.email,
    password: request.body.password
  });
  response.status(status).send(result);
});

module.exports = [router, auth];
