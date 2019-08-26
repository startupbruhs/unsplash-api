const joi = require("joi");
const express = require("express");
const router = new express.Router();
const userService = require("../../services/User");
const validate = require("../../middlewares/validate");

router.get("/me", async (request, response) => {
  response.send(request.user);
});

router.post("/logout", async (request, response) => {
  const { status, result } = await userService.logout(request);
  response.status(status).send(result);
});

router.post("/logout-everywhere", async (request, response) => {
  const { status, result } = await userService.logoutEverywhere(request);
  response.status(status).send(result);
});

router.patch(
  "/me",
  validate({
    email: joi.string().email(),
    password: joi.string(),
    name: joi.string()
  }),
  async (request, response) => {
    const { status, result } = await userService.updateUser(request);
    response.status(status).send(result);
  }
);

router.delete("/me", async (request, response) => {
  const { status, result } = await userService.deleteUser(request.user);
  response.status(status).send(result);
});

module.exports = router;
