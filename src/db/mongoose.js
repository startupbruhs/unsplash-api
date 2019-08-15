const mongoose = require("mongoose");
const url = process.env.DB_URL || "mongodb://127.0.0.1:27017/unsplash-api";

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Nice");
});
