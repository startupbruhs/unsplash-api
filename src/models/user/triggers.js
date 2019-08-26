const bcrypt = require("bcryptjs");

const triggers = {
  events: ["pre"],
  //register on what event will the triggers be used
  pre: {
    methods: ["save", "remove"],
    //register what methods will use the trigger
    save: async function(next) {
      const user = this;

      if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
      }
      next();
    },
    remove: async function(next) {
      const user = this;
      next();
    }
  }
};

module.exports = triggers;
