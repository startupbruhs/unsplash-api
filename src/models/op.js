const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const mockSchema = new Schema({
  title: {
    title: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});
