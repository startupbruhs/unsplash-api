const fs = require("fs");

const folders = [
  { name: "methods", fallback: null },
  { name: "statics", fallback: null },
  { name: "triggers", fallback: null },
  { name: "schema" }
];

const handleFallbackOperation = (folder, model) => {
  if (folder.fallback !== undefined) {
    return folder.fallback;
  } else {
    throw new Error(
      `Please provide a ${folder.name}.js file for the ${model} folder`
    );
  }
};

module.exports = (dir, model) => {
  let props = {};

  folders.forEach(folder => {
    const path = dir.concat(`/${model}/${folder.name}.js`);
    if (fs.existsSync(path)) {
      props[folder.name] = require(path);
    } else {
      props[folder.name] = handleFallbackOperation(folder, model);
    }
  });

  return props;
};
