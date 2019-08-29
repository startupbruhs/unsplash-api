const mockModel = require("../models/mock");
const Service = require("./Service");

class Mock extends Service {
  constructor() {
    super();
    this.model = mockModel;
  }

  all(title = "") {
    return mockModel.find(
      { title: { $regex: new RegExp(title, "i") } },
      null // { limit: 1 }
    );
  }
}

module.exports = new Mock();
