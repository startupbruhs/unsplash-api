const Model = require("../model");
const schema = require("./schema");
const methods = require("./methods");
const statics = require("./statics");
const triggers = require("./triggers");

const User = new Model("User", schema);
User.register("methods", methods);
User.register("statics", statics);
User.register("triggers", triggers);

module.exports = User.save();
