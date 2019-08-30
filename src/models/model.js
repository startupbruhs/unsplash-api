const ModelInterface = require("./interface");
const fs = require("fs");

class Model extends ModelInterface {
  constructor() {
    super();
    this.folders = [
      { name: "methods", fallback: null },
      { name: "statics", fallback: null },
      { name: "triggers", fallback: null },
      { name: "schema" }
    ];
    this.name = this.constructor.name;
    this.props = this.getProps();
    return this.init();
  }

  getProps() {
    let props = {};
    this.folders.forEach(folder => {
      const path = `/${this.name.toLowerCase()}/${folder.name}.js`;
      fs.access(__dirname + path, fs.F_OK, err => {
        if (err) {
          if (folder.fallback !== undefined) {
            props[folder.name] = folder.fallback;
          } else {
            console.error(new Error(err));
            return;
          }
        } else {
          props[folder.name] = require(`./${path}`);
        }
      });
    });
    return props;
  }

  init() {
    Object.keys(this.props).forEach(prop => {
      if (this.props[prop]) {
        this.register(prop, this.props[prop]);
      }
    });
    this.save();
  }
}

module.exports = Model;
