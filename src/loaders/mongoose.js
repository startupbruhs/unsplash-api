const { connect, connection, model } = require("mongoose");
const config = require("../config");
const url = config.databaseURL;

module.exports = async () => {
  const DB__CONNECTION = await connect(
    url,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

  var db = connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Fiiiiiks");
  });

  return DB__CONNECTION.connection.db;
};
