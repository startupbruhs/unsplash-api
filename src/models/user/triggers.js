const bcrypt = require("bcryptjs");

const triggers = {
  pre: {
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
