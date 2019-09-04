const cors = require("cors");
const routes = require("../api");
const { json } = require("express");
const socket = require("./socket");

module.exports = async app => {
  app
    .use(json())
    .use(cors())
    .use("/api", routes);
  socket();

  return app;
};
