const Model = require("../model");
const methods = require("./methods");
const statics = require("./statics");
const triggers = require("./triggers");

class User extends Model {
  constructor() {
    super();
    this.methods = methods;
    this.statics = statics;
    this.triggers = triggers;
  }
}

module.exports = User;
