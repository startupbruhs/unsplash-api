const express = require("express");
const router = new express.Router();

router.post("/users", (request, response) => {
  //do stuff here
});

router.get('/users', (request, response) => {
  response.send("Hey")
})

module.exports = router;