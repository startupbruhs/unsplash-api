require("../db/mongoose");
const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("", (_, response) => {
  response.send("Hey");
});

router.get("/users", async (_, response) => {
  try {
    const users = await User.find();
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/users", async (request, response) => {
  const user = new User(request.body);
  try {
    await user.save();
    response.status(200).send(user);
  } catch (error) {
    response.status(400).send(error);
  }
});

router.patch("/users/:id", async (request, response) => {
  const id = request.params.id;
  const updates = Object.keys(request.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return response.status(400).send({ error: "invalid updates" });

  try {
    const user = await User.findById(request.params.id);
    updates.forEach(update => (user[update] = request.body[update]));
    await user.save();
  } catch (error) {
    response.status(400).send(error);
  }
});

router.delete("/users/:id", async (request, response) => {
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
