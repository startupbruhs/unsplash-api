const Service = require("./Service");
const { Mock } = require("../loaders/models");

class MockService extends Service {
  constructor() {
    super();
    this.model = Mock;
  }

  all(title = "") {
    return this.model.find({ title: { $regex: new RegExp(title, "i") } }, null);
  }
}

module.exports = new MockService();
