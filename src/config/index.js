const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  secret: process.env.SECRET
};
