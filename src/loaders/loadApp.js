const routes = require("../api");
const express = require("express");

module.exports = async app => {
  app.use(express.json());
  app.use("/api", routes);

  return app;
};
