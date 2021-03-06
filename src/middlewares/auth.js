const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config");
const secret = config.secret;

const auth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!user) {
      throw new Error();
    }

    request.user = user;
    request.token = token;
    next();
  } catch (error) {
    response.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = auth;
