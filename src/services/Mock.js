const mockModel = require("../models/mock");
const Service = require("./Service");

class Mock extends Service {
  constructor() {
    super();
    this.model = mockModel;
  }

  all() {
    return mockModel.find({});
  }
}

module.exports = new Mock();
