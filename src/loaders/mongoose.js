const mongoose = require("mongoose");
const config = require("../config");
const url = config.databaseURL;

module.exports = async () => {
  const connection = await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Fiiiiiks");
  });

  return connection.connection.db;
};
