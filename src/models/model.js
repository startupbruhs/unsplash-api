const { model } = require("mongoose");

class Model {
  constructor(name, schema) {
    this.schema = schema;
    this.name = name;
    return this;
  }
  registerMethods(type, data) {
    const availableMethods = Object.keys(data);
    availableMethods.forEach(method => {
      this.schema[type][method] = data[method];
    });
    return;
  }

  registerTriggers(triggers) {
    const events = Object.keys(triggers);
    let methods = [];
    events.forEach(trigger => {
      methods = Object.keys(triggers[trigger]);
      methods.forEach(method => {
        this.schema[trigger](method, triggers[trigger][method]);
      });
    });
    return;
  }

  register(type, data) {
    switch (type) {
      case "methods" || "statics":
        return this.registerMethods(type, data);
      case "triggers":
        return this.registerTriggers(data);
      default:
        return;
    }
  }

  save() {
    return model(this.name, this.schema);
  }
}

module.exports = Model;
