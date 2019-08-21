const express = require("express");
const router = new express.Router();
const auth = require("../../middlewares/auth");

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
  const updates = Object.keys(request.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return response.status(400).send({ error: "invalid updates" });

  try {
    const user = request.user;
    updates.forEach(update => (user[update] = request.body[update]));
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(400).send(error);
  }
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
