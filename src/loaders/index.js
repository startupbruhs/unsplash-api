const express = require("express");
const connection = require("./mongoose");
const loadApp = require("./loadApp");

module.exports = async () => {
  await connection();
  const app = await loadApp(new express());
  return app;
};
