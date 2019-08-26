const router = new require("express").Router();
const Mock = require("../../services/Mock");

router.get("/test", async (_, res) => {
  const mock = await Mock.all();
  res.status(200).send({
    success: 1,
    data: mock
  });
});

module.exports = router;
