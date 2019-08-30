const { model } = require("mongoose");

class ModelInterface {
  registerMethods(type, data) {
    const availableMethods = Object.keys(data);
    availableMethods.forEach(method => {
      this.props.schema[type][method] = data[method];
    });
    return;
  }

  registerTriggers(triggers) {
    const events = Object.keys(triggers);
    let methods = [];
    events.forEach(trigger => {
      methods = Object.keys(triggers[trigger]);
      methods.forEach(method => {
        this.props.schema[trigger](method, triggers[trigger][method]);
      });
    });
    return;
  }

  register(type, data) {
    switch (type) {
      case "methods":
        return this.registerMethods(type, data);
      case "statics":
        return this.registerMethods(type, data);
      case "triggers":
        return this.registerTriggers(data);
      default:
        console.error(
          `Please specify what you want to render\n
              Options: (methods|statics|triggers) and pass the data`
        );
        return;
    }
  }

  save() {
    console.log(this.name, this.props.schema);
    return this.props.schema;
    // return model(this.name, this.props.schema);
  }
}

module.exports = ModelInterface;
