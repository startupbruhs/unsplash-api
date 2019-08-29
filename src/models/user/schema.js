const { Schema } = require("mongoose");
const validator = require("validator");

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be > 0");
      }
    },
    default: 18
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`${value} is not a valid email!`);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error("password length > 6");
      }
      if (value.includes("password")) {
        throw new Error("should not include password");
      }
    },
    trim: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = schema;
