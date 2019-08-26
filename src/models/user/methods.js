const jwt = require("jsonwebtoken");
const { secret } = require("../../config");

function toJSON() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
}

async function generateAuthToken() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, secret);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

module.exports = {
  availableMethods: ["toJSON", "generateAuthToken"],
  toJSON,
  generateAuthToken
};
