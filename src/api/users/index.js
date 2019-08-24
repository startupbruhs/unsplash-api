const auth = require("./auth");
const express = require("express");
const router = new express.Router();
const userService = require("../../services/User");

router.post("/users", async (request, response) => {
  const { status, result } = await userService.create(request.body);
  response.status(status).send(result);
});

router.post("/users/login", async (request, response) => {
  const { status, result } = await userService.login({
    email: request.body.email,
    password: request.body.password
  });
  response.status(status).send(result);
});

module.exports = [router, auth];
