const express = require("express");
const router = new express.Router();
const User = require('../models/user')

router.post("/users", async (request, response) => {
  const user = new User(request.body)
  try {
    await user.save();
    response.status(200).send(user);
  } catch(error) {
    response.status(400).send(error);
  }
});

router.get('/users', (request, response) => {
  const user = new User({"name": "Eraldo", "email" : "eraldoforgoli@gmail.com"})
  response.send(user)
})

module.exports = router;