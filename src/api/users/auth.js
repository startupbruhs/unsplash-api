const express = require("express");
const router = new express.Router();
const auth = require("../../middlewares/auth");
const userService = require("../../services/User");

router.use(auth);

router.get("/users/me", async (request, response) => {
  response.send(request.user);
});

router.post("/users/logout", async (request, response) => {
  const { status, result } = await userService.logout(request);
  response.status(status).send(result);
});

router.post("/users/logout-everywhere", async (request, response) => {
  const { status, result } = await userService.logoutEverywhere(request);
  response.status(status).send(result);
});

router.patch("/users/me", async (request, response) => {
  const { status, result } = await userService.updateUser(request);
  response.status(status).send(result);
});

router.delete("/users/me", async (request, response) => {
  const { status, result } = await userService.deleteUser(request.user);
  response.status(status).send(result);
});

module.exports = router;
