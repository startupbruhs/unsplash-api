const bcrypt = require("bcryptjs");

async function findByCredentials(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to log in");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to log in");
  return user;
}

module.exports = { availableMethods: ["findByCredentials"], findByCredentials };
