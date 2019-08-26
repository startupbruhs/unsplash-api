const Model = require("../model");
const schema = require("./schema");

const Mock = new Model("Mock", schema);

module.exports = Mock.save();
