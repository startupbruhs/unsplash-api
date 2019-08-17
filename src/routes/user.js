require("../db/mongoose");
const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.get("/users/me", auth, async (request, response) => {
  response.send(request.user);
});

router.post("/users", async (request, response) => {
  const user = new User(request.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    response.status(200).send({ user, token });
  } catch (error) {
    response.status(400).send(error);
  }
});

router.post("/users/login", async (request, response) => {
  try {
    const user = await User.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateAuthToken();
    response.send({ user, token });
  } catch (error) {
    response.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (request, response) => {
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

router.post("/users/logout-everywhere", auth, async (request, response) => {
  try {
    request.user.tokens = [];
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/users/:id", auth, async (request, response) => {
  const id = request.params.id;
  const updates = Object.keys(request.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return response.status(400).send({ error: "invalid updates" });

  try {
    const user = await User.findById(id);
    updates.forEach(update => (user[update] = request.body[update]));
    await user.save();
  } catch (error) {
    response.status(400).send(error);
  }
});

router.delete("/users/:id", auth, async (request, response) => {
  const id = request.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return response.status(404).send();
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
