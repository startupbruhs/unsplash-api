const fs = require("fs");

module.exports = dir =>
  fs
    .readdirSync(dir, {
      withFileTypes: true
    })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
