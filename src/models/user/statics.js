const bcrypt = require("bcryptjs");

async function findByCredentials(email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Unable to log in");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to log in");
  return user;
}

module.exports = { findByCredentials };
