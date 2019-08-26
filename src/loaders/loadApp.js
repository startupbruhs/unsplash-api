const cors = require("cors");
const routes = require("../api");
const { json } = require("express");

module.exports = async app => {
  app
    .use(json())
    .use(cors())
    .use("/api", routes);

  return app;
};
