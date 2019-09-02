const ModelInterface = require("./interface");

class Model extends ModelInterface {
  constructor(props) {
    super(props);
    this.name = this.constructor.name;
    return this.init();
  }

  init() {
    Object.keys(this.props).forEach(prop => {
      if (this.props[prop] && prop !== "schema") {
        this.register(prop, this.props[prop]);
      }
    });
    return this.save();
  }
}

module.exports = Model;
