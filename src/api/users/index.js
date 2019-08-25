const auth = require("./auth");
const joi = require("joi");
const express = require("express");
const router = new express.Router();
const validate = require("../../middlewares/validate");
const userService = require("../../services/User");

router.post(
  "/users",
  validate({
    email: joi
      .string()
      .email()
      .required(),
    name: joi.string().required(),
    password: joi.string().required()
  }),
  async (request, response) => {
    const { status, result } = await userService.create(request.validatedBody);
    response.status(status).send(result);
  }
);

router.post("/users/login", async (request, response) => {
  const { status, result } = await userService.login({
    email: request.body.email,
    password: request.body.password
  });
  response.status(status).send(result);
});

module.exports = [router, auth];
