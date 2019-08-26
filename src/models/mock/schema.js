const { Schema } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = schema;
