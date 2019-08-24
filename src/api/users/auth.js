const express = require("express");
const router = new express.Router();
const auth = require("../../middlewares/auth");
const userService = require("../../services/User")

router.use(auth);

router.get("/users/me", async (request, response) => {
  response.send(request.user);
});

router.post("/users/logout", async (request, response) => {
  try {
    request.user.tokens = request.user.tokens.filter(
      token => token.token !== request.token
    );
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

router.post("/users/logout-everywhere", async (request, response) => {
  try {
    request.user.tokens = [];
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/users/me", async (request, response) => {
  const { status, result } = await userService.updateUser(request);
  response.status(status).send(result);
});

router.delete("/users/me", async (request, response) => {
  try {
    await request.user.remove();
    response.send(request.user);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
