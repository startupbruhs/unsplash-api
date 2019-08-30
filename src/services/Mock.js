const MockModel = require("../models/mock");
const Service = require("./Service");

class Mock extends Service {
  constructor() {
    super();
    this.model = new MockModel().props.schema;
  }

  all(title = "") {
    return this.model.find(
      { title: { $regex: new RegExp(title, "i") } },
      null // { limit: 1 }
    );
  }
}

module.exports = new Mock();
