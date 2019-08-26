const express = require("express");
const router = new express.Router();

const auth = require("../../middlewares/auth");
const user = require("./user");

router.use(auth);
router.use("/users", user);

module.exports = router;
