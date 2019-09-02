const path = require("path");
const loadModels = require("./loadModels");
const capitalize = require("lodash/capitalize");
const loadModelProps = require("./loadModelProps");

const dir = path.resolve("./src/models");
const loadedModels = {};

loadModels(dir).forEach(m => {
  const Model = require(dir.concat(`/${m}`));
  loadedModels[capitalize(m)] = new Model(loadModelProps(dir, m));
});
module.exports = loadedModels;
